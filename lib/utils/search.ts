// Semantic search utilities for perfume store

/**
 * Fragrance family synonyms and related terms
 */
export const FRAGRANCE_FAMILIES: Record<string, string[]> = {
    floral: ['rose', 'jasmine', 'lavender', 'lily', 'peony', 'gardenia', 'violet', 'iris', 'tuberose', 'ylang'],
    woody: ['cedar', 'sandalwood', 'oak', 'pine', 'vetiver', 'patchouli', 'oud', 'agarwood'],
    citrus: ['lemon', 'orange', 'bergamot', 'grapefruit', 'lime', 'mandarin', 'tangerine'],
    oriental: ['vanilla', 'amber', 'musk', 'spice', 'incense', 'cinnamon', 'cardamom'],
    fresh: ['aquatic', 'marine', 'green', 'clean', 'crisp', 'water', 'ocean'],
    fruity: ['apple', 'peach', 'berry', 'pear', 'plum', 'cherry', 'tropical'],
    spicy: ['pepper', 'ginger', 'clove', 'nutmeg', 'saffron'],
    sweet: ['honey', 'caramel', 'chocolate', 'sugar', 'gourmand'],
};

/**
 * Common perfume-related synonyms
 */
export const PERFUME_SYNONYMS: Record<string, string[]> = {
    perfume: ['fragrance', 'scent', 'cologne', 'eau de parfum', 'edp', 'eau de toilette', 'edt'],
    smell: ['scent', 'fragrance', 'aroma', 'odor'],
    strong: ['intense', 'powerful', 'bold', 'concentrated'],
    light: ['subtle', 'delicate', 'soft', 'gentle'],
    long: ['lasting', 'longlasting', 'durable', 'persistent'],
    men: ['masculine', 'male', 'homme', 'for him'],
    women: ['feminine', 'female', 'femme', 'for her'],
    luxury: ['premium', 'high-end', 'expensive', 'designer'],
    cheap: ['affordable', 'budget', 'inexpensive', 'economical'],
};

/**
 * Brand name aliases and variations
 */
export const BRAND_ALIASES: Record<string, string> = {
    'ysl': 'Yves Saint Laurent',
    'ck': 'Calvin Klein',
    'dg': 'Dolce & Gabbana',
    'jpm': 'Jean Paul Gaultier',
    'tom ford': 'Tom Ford',
    'armani': 'Giorgio Armani',
};

/**
 * Expand search query with synonyms and related terms
 */
export function expandSearchQuery(query: string): string[] {
    const terms = query.toLowerCase().trim().split(/\s+/);
    const expanded = new Set<string>();

    // Add original terms
    terms.forEach(term => expanded.add(term));

    // Add synonyms
    terms.forEach(term => {
        // Check perfume synonyms
        Object.entries(PERFUME_SYNONYMS).forEach(([key, synonyms]) => {
            if (key === term) {
                synonyms.forEach(syn => expanded.add(syn));
            }
            if (synonyms.includes(term)) {
                expanded.add(key);
                synonyms.forEach(syn => expanded.add(syn));
            }
        });

        // Check fragrance families
        Object.entries(FRAGRANCE_FAMILIES).forEach(([family, notes]) => {
            if (family === term) {
                notes.forEach(note => expanded.add(note));
            }
            if (notes.includes(term)) {
                expanded.add(family);
            }
        });

        // Check brand aliases
        Object.entries(BRAND_ALIASES).forEach(([alias, fullName]) => {
            if (alias === term) {
                expanded.add(fullName.toLowerCase());
            }
            if (fullName.toLowerCase().includes(term)) {
                expanded.add(alias);
            }
        });
    });

    return Array.from(expanded);
}

/**
 * Build Prisma search query with semantic expansion
 */
export function buildSearchQuery(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
        return {};
    }

    const expandedTerms = expandSearchQuery(searchTerm);

    // Build OR conditions for each expanded term
    const searchConditions = expandedTerms.map(term => ({
        OR: [
            { name: { contains: term, mode: 'insensitive' as const } },
            { brand: { contains: term, mode: 'insensitive' as const } },
            { description: { contains: term, mode: 'insensitive' as const } },
            { fragranceType: { contains: term, mode: 'insensitive' as const } },
        ],
    }));

    return {
        OR: searchConditions,
    };
}

/**
 * Calculate relevance score for search results
 */
export function calculateRelevanceScore(
    product: {
        name: string;
        brand: string;
        description: string | null;
        fragranceType: string | null;
    },
    searchTerm: string
): number {
    const query = searchTerm.toLowerCase();
    const expandedTerms = expandSearchQuery(searchTerm);
    let score = 0;

    const name = product.name.toLowerCase();
    const brand = product.brand.toLowerCase();
    const description = product.description?.toLowerCase() || '';
    const fragranceType = product.fragranceType?.toLowerCase() || '';

    // Exact matches (highest priority)
    if (name === query) score += 100;
    if (brand === query) score += 90;

    // Starts with query
    if (name.startsWith(query)) score += 50;
    if (brand.startsWith(query)) score += 45;

    // Contains query
    if (name.includes(query)) score += 30;
    if (brand.includes(query)) score += 25;
    if (fragranceType.includes(query)) score += 20;
    if (description.includes(query)) score += 10;

    // Semantic matches (expanded terms)
    expandedTerms.forEach(term => {
        if (term !== query) {
            // Lower scores for semantic matches
            if (name.includes(term)) score += 15;
            if (brand.includes(term)) score += 12;
            if (fragranceType.includes(term)) score += 10;
            if (description.includes(term)) score += 5;
        }
    });

    return score;
}

/**
 * Rank search results by relevance
 */
export function rankSearchResults<T extends {
    name: string;
    brand: string;
    description: string | null;
    fragranceType: string | null;
}>(products: T[], searchTerm: string): T[] {
    if (!searchTerm || searchTerm.trim() === '') {
        return products;
    }

    return products
        .map(product => ({
            product,
            score: calculateRelevanceScore(product, searchTerm),
        }))
        .sort((a, b) => b.score - a.score)
        .map(({ product }) => product);
}

/**
 * Simple fuzzy matching for typos (Levenshtein distance)
 */
export function fuzzyMatch(str1: string, str2: string, threshold: number = 2): boolean {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();

    if (s1 === s2) return true;
    if (Math.abs(s1.length - s2.length) > threshold) return false;

    const distance = levenshteinDistance(s1, s2);
    return distance <= threshold;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

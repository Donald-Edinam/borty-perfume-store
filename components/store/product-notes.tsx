import { ProductNotes as ProductNotesType } from "@/types/shop";
import { Separator } from "@/components/ui/separator";

interface ProductNotesProps {
    notes: ProductNotesType | null;
}

export function ProductNotes({ notes }: ProductNotesProps) {
    if (!notes) {
        return null;
    }

    const hasNotes =
        (notes.top && notes.top.length > 0) ||
        (notes.middle && notes.middle.length > 0) ||
        (notes.base && notes.base.length > 0);

    if (!hasNotes) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Fragrance Notes</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                {/* Top Notes */}
                {notes.top && notes.top.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="text-sm font-bold uppercase tracking-wide text-gray-500 w-24 flex-shrink-0">
                            Top
                        </span>
                        <div className="flex-1 mt-1 sm:mt-0">
                            <p className="text-gray-900 leading-relaxed">
                                {notes.top.join(", ")}
                            </p>
                        </div>
                    </div>
                )}

                {notes.top && notes.top.length > 0 && notes.middle && notes.middle.length > 0 && (
                    <Separator className="bg-gray-200" />
                )}

                {/* Middle Notes */}
                {notes.middle && notes.middle.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="text-sm font-bold uppercase tracking-wide text-gray-500 w-24 flex-shrink-0">
                            Heart
                        </span>
                        <div className="flex-1 mt-1 sm:mt-0">
                            <p className="text-gray-900 leading-relaxed">
                                {notes.middle.join(", ")}
                            </p>
                        </div>
                    </div>
                )}

                {notes.middle && notes.middle.length > 0 && notes.base && notes.base.length > 0 && (
                    <Separator className="bg-gray-200" />
                )}

                {/* Base Notes */}
                {notes.base && notes.base.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="text-sm font-bold uppercase tracking-wide text-gray-500 w-24 flex-shrink-0">
                            Base
                        </span>
                        <div className="flex-1 mt-1 sm:mt-0">
                            <p className="text-gray-900 leading-relaxed">
                                {notes.base.join(", ")}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

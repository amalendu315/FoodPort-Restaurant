"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Paginator({ currentPage, totalPages, onPageChange, className }: PaginatorProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const half = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (currentPage <= half) {
            for (let i = 1; i <= maxPagesToShow - 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - half) {
            pages.push(1);
            pages.push('...');
            for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - half + 1; i < currentPage + half; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={cn("flex justify-center items-center gap-2", className)}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            {pageNumbers.map((page, index) =>
                typeof page === 'number' ? (
                    <Button
                        key={index}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                ) : (
                    <span key={index} className="px-2">...</span>
                )
            )}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

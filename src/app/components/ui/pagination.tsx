/**
 * @fileoverview Mobile-optimized pagination component for Ash Shaw Portfolio
 * 
 * Enhanced pagination with proper mobile touch support, accessibility,
 * and brand-compliant styling following guidelines.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 3.2.0 - Semantic BEM Refactor
 */

import * as React from "react";
import {
  CaretLeft,
  CaretRight,
  DotsThree,
} from "@phosphor-icons/react";

import { cn } from "./utils";
import "../../../styles/blocks/pagination.css";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("pagination", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("pagination__content", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className="pagination__item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">;

function PaginationLink({
  className,
  isActive,
  onClick,
  disabled = false,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "pagination__link",
        isActive && "pagination__link--active",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PaginationPrevious({
  className,
  onClick,
  disabled = false,
  ...props
}: Omit<PaginationLinkProps, 'children'>) {
  return (
    <PaginationLink
      onClick={onClick}
      disabled={disabled}
      aria-label="Go to previous page"
      className={cn("pagination__nav-button", className)}
      {...props}
    >
      <CaretLeft className="pagination__nav-icon" />
      <span className="pagination__label">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  onClick,
  disabled = false,
  ...props
}: Omit<PaginationLinkProps, 'children'>) {
  return (
    <PaginationLink
      onClick={onClick}
      disabled={disabled}
      aria-label="Go to next page"
      className={cn("pagination__nav-button", className)}
      {...props}
    >
      <span className="pagination__label">Next</span>
      <CaretRight className="pagination__nav-icon" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("pagination__ellipsis", className)}
      {...props}
    >
      <DotsThree className="pagination__ellipsis-icon" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
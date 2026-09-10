/**
 * @fileoverview Ebook chapter jump drawer — bottom sheet on mobile, side panel on desktop.
 * Extracted from EbookPage.tsx (T14).
 */

import React from 'react';
import { X, CaretDown } from '@phosphor-icons/react';
import { ebookUI } from '../../../../data/mock/ui/ebook';
import type { DrawerGroup } from './ebookHelpers';

interface EbookDrawerProps {
  drawerOpen: boolean;
  onClose: () => void;
  drawerGroups: DrawerGroup[];
  collapsedGroups: Record<string, boolean>;
  onToggleGroup: (groupId: string) => void;
  onJumpToPage: (pageIndex: number) => void;
  currentChapterIdx: number;
}

export function EbookDrawer(props: EbookDrawerProps) {
  var drawerOpen = props.drawerOpen;
  var onClose = props.onClose;
  var groups = props.drawerGroups;
  var collapsed = props.collapsedGroups;
  var onToggleGroup = props.onToggleGroup;
  var onJumpToPage = props.onJumpToPage;
  var currentChapterIdx = props.currentChapterIdx;

  return (
    <div className="ebook-drawer-container">
      {drawerOpen && (
        <div
          className="ebook-drawer__backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={'ebook-drawer' + (drawerOpen ? ' ebook-drawer--open' : '')}
        role="dialog"
        aria-label={ebookUI.drawer.ariaLabel}
        aria-hidden={!drawerOpen}
      >
        <div className="ebook-drawer__header">
          <span className="ebook-drawer__title">{ebookUI.drawer.title}</span>
          <button
            type="button"
            className="ebook-reader__nav-btn"
            onClick={onClose}
            aria-label={ebookUI.drawer.closeAriaLabel}
          >
            <X className="ebook-reader__nav-icon" aria-hidden="true" />
          </button>
        </div>
        <nav className="ebook-drawer__list" aria-label={ebookUI.drawer.listAriaLabel}>
          {groups.map(function (group) {
            var isCollapsed = collapsed[group.id] ? true : false;
            var groupClass = 'ebook-drawer__group' + (isCollapsed ? ' ebook-drawer__group--collapsed' : '');
            return (
              <div key={group.id} className={groupClass}>
                <div className="ebook-drawer__group-header">
                  <span className="ebook-drawer__group-title">{group.label}</span>
                  {group.collapsible && (
                    <button
                      type="button"
                      className="ebook-drawer__group-toggle"
                      aria-label={'Toggle ' + group.label}
                      onClick={function () { onToggleGroup(group.id); }}
                    >
                      <CaretDown className="ebook-reader__nav-icon" aria-hidden="true" />
                    </button>
                  )}
                </div>
                <div className="ebook-drawer__group-content">
                  {(!group.collapsible || !isCollapsed) && group.entries.map(function (entryItem) {
                    var indentClass = entryItem.entry.indent ? 'ebook-drawer__item--indent' : 'ebook-drawer__item--section';
                    var isActive = entryItem.globalIdx === currentChapterIdx;
                    var activeClass = isActive ? 'ebook-drawer__item--active' : '';
                    return (
                      <button
                        type="button"
                        key={'ch-idx-' + entryItem.globalIdx}
                        className={'ebook-drawer__item ' + indentClass + ' ' + activeClass}
                        onClick={function () { onJumpToPage(entryItem.entry.pageIndex); }}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {entryItem.entry.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
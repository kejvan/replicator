#!/usr/bin/env node

// ============================================================================
// REPLICATOR THEME GENERATOR
// Main theme generator that imports color palettes and creates VS Code themes
// ============================================================================

const fs = require('fs');
const path = require('path');

// Package Metadata - VS Code extension configuration
const packageMetadata = {
  name: 'replicant',
  displayName: 'Replicant',
  description: 'Generated themes based on Atom One Dark',
  version: '1.0.0',
  publisher: 'Knisle',
  author: 'Keivan',
  engines: {
    vscode: '^1.74.0'
  }
};

// ============================================================================
// THEME GENERATION FUNCTIONS
// ============================================================================

function generateTheme(themeMetadata, uiColors, syntaxColors) {
  return {
    name: themeMetadata.name,
    type: 'dark',
    colors: {
      // Editor
      'editor.background': uiColors.background,
      'editor.foreground': uiColors.foreground,
      'editor.lineHighlightBackground': uiColors.currentLine,
      'editor.selectionBackground': uiColors.selection,
      'editor.selectionHighlightBackground': uiColors.selectionHighlight,
      'editor.findMatchBackground': (uiColors.searchHighlight || uiColors.highlight) + '40',
      'editor.findMatchHighlightBackground': (uiColors.searchHighlight || uiColors.highlight) + '25',
      'editor.wordHighlightBackground': uiColors.selectionHighlight + '60',
      'editor.wordHighlightStrongBackground': uiColors.selectionHighlight,
      'editorStickyScroll.background': uiColors.background,
      'editorCursor.foreground': uiColors.accent,
      'editorLineNumber.foreground': uiColors.foregroundMuted,
      'editorLineNumber.activeForeground': uiColors.foreground,
      'editorWhitespace.foreground': uiColors.foregroundMuted + '40',
      'editorIndentGuide.background': uiColors.foregroundMuted + '20',
      'editorIndentGuide.activeBackground': uiColors.foregroundMuted + '40',

      // Editor Groups & Tabs
      'editorGroup.border': uiColors.border,
      'editorGroupHeader.tabsBackground': uiColors.backgroundDarker,
      'tab.activeBackground': uiColors.background,
      'tab.inactiveBackground': uiColors.backgroundDarker,
      'tab.activeForeground': uiColors.foreground,
      'tab.inactiveForeground': uiColors.foregroundMuted,
      'tab.border': uiColors.border,

      // Activity Bar
      'activityBar.background': uiColors.backgroundDarker,
      'activityBar.foreground': uiColors.foreground,
      'activityBar.inactiveForeground': uiColors.foregroundMuted,
      'activityBar.border': uiColors.border,
      'activityBarBadge.background': uiColors.accent,
      'activityBarBadge.foreground': uiColors.background,

      // Sidebar
      'sideBar.background': uiColors.backgroundDarker,
      'sideBar.foreground': uiColors.foreground,
      'sideBar.border': uiColors.border,
      'sideBarTitle.foreground': uiColors.foreground,
      'sideBarSectionHeader.background': uiColors.backgroundLighter,
      'sideBarSectionHeader.foreground': uiColors.foreground,

      // List & Tree
      'list.activeSelectionBackground': uiColors.selection,
      'list.activeSelectionForeground': uiColors.foreground,
      'list.focusBackground': uiColors.selectionHighlight,
      'list.hoverBackground': uiColors.selectionHighlight + '80',
      'list.inactiveSelectionBackground': uiColors.selectionHighlight,
      'list.highlightForeground': uiColors.accent,

      // Status Bar
      'statusBar.background': uiColors.backgroundDarker,
      'statusBar.foreground': uiColors.foreground,
      'statusBar.border': uiColors.border,
      'statusBar.debuggingBackground': uiColors.warning,
      'statusBar.debuggingForeground': uiColors.background,
      'statusBar.noFolderBackground': uiColors.backgroundDarker,
      'statusBarItem.hoverBackground': uiColors.selectionHighlight + '60',
      'statusBarItem.hoverForeground': uiColors.foreground,
      'statusBarItem.compactHoverBackground': uiColors.selectionHighlight + 'A0',
      'statusBarItem.activeBackground': uiColors.selection + '80',
      'statusBarItem.prominentBackground': uiColors.accent,
      'statusBarItem.prominentHoverBackground': uiColors.accentMuted,
      'statusBarItem.prominentForeground': uiColors.background,
      'statusBarItem.remoteBackground': uiColors.accent,
      'statusBarItem.remoteForeground': uiColors.background,

      // Title Bar
      'titleBar.activeBackground': uiColors.backgroundDarker,
      'titleBar.activeForeground': uiColors.foreground,
      'titleBar.inactiveBackground': uiColors.backgroundDarker + 'cc',
      'titleBar.inactiveForeground': uiColors.foregroundMuted,
      'titleBar.border': uiColors.border,

      // Panel
      'panel.background': uiColors.background,
      'panel.border': uiColors.border,
      'panelTitle.activeForeground': uiColors.foreground,
      'panelTitle.inactiveForeground': uiColors.foregroundMuted,

      // Terminal
      'terminal.background': uiColors.background,
      'terminal.foreground': uiColors.foreground,
      'terminal.ansiBlack': uiColors.backgroundDarker,
      'terminal.ansiRed': uiColors.chartRed,
      'terminal.ansiGreen': uiColors.chartGreen,
      'terminal.ansiYellow': uiColors.chartYellow,
      'terminal.ansiBlue': uiColors.chartBlue,
      'terminal.ansiMagenta': uiColors.chartPurple,
      'terminal.ansiCyan': uiColors.chartCyan,
      'terminal.ansiWhite': uiColors.foreground,

      // Input
      'input.background': uiColors.backgroundLighter,
      'input.foreground': uiColors.foreground,
      'input.border': uiColors.border,
      'input.placeholderForeground': uiColors.foregroundMuted,
      'inputOption.activeBorder': uiColors.accent,

      // Focus Border
      'focusBorder': uiColors.accent,

      // Toolbar & Action Buttons
      'toolbar.hoverBackground': uiColors.selectionHighlight,
      'toolbar.activeBackground': uiColors.selection,

      // Icon Colors
      'icon.foreground': uiColors.foreground,

      // Action Bar & Editor Actions  
      'editorGroupHeader.border': uiColors.border,
      'editorGroupHeader.noTabsBackground': uiColors.backgroundDarker,
      'editorActions.background': uiColors.backgroundLighter,
      'editorActions.foreground': uiColors.foregroundMuted,

      // Tab Actions
      'tab.hoverBackground': uiColors.selectionHighlight + '60',
      'tab.unfocusedHoverBackground': uiColors.selectionHighlight + '40',

      // List Hover (affects many UI elements)
      'list.hoverForeground': uiColors.foreground,
      'list.activeSelectionIconForeground': uiColors.accent,
      'list.inactiveSelectionIconForeground': uiColors.foregroundMuted,
      'list.focusHighlightForeground': uiColors.accent,

      // Dropdown
      'dropdown.background': uiColors.backgroundLighter,
      'dropdown.foreground': uiColors.foreground,
      'dropdown.border': uiColors.border,

      // Button
      'button.background': uiColors.accent,
      'button.foreground': uiColors.background,
      'button.hoverBackground': uiColors.accentMuted,

      // Scrollbar
      'scrollbar.shadow': uiColors.backgroundDarker + '80',
      'scrollbarSlider.background': uiColors.foregroundMuted + '20',
      'scrollbarSlider.hoverBackground': uiColors.foregroundMuted + '30',
      'scrollbarSlider.activeBackground': uiColors.foregroundMuted + '40',

      // Badge
      'badge.background': uiColors.accent,
      'badge.foreground': uiColors.background,

      // Progress Bar
      'progressBar.background': uiColors.accent,

      // Notifications
      'notifications.background': uiColors.backgroundLighter,
      'notifications.foreground': uiColors.foreground,
      'notifications.border': uiColors.border,
      'notificationToast.border': uiColors.border,
      'notificationCenter.border': uiColors.border,
      'notificationCenterHeader.background': uiColors.backgroundDarker,
      'notificationCenterHeader.foreground': uiColors.foreground,

      // Extensions
      'extensionButton.prominentBackground': uiColors.accent,
      'extensionButton.prominentForeground': uiColors.background,
      'extensionButton.prominentHoverBackground': uiColors.accentMuted,

      // Peek View
      'peekView.border': uiColors.accent,
      'peekViewEditor.background': uiColors.backgroundLighter,
      'peekViewEditor.matchHighlightBackground': (uiColors.searchHighlight || uiColors.highlight) + '40',
      'peekViewResult.background': uiColors.backgroundDarker,
      'peekViewResult.matchHighlightBackground': (uiColors.searchHighlight || uiColors.highlight) + '40',
      'peekViewResult.selectionBackground': uiColors.selection,
      'peekViewTitle.background': uiColors.backgroundDarker,
      'peekViewTitleDescription.foreground': uiColors.foregroundMuted,
      'peekViewTitleLabel.foreground': uiColors.foreground,

      // Merge Conflicts
      'merge.currentHeaderBackground': uiColors.success + '90',
      'merge.currentContentBackground': uiColors.success + '40',
      'merge.incomingHeaderBackground': uiColors.info + '90',
      'merge.incomingContentBackground': uiColors.info + '40',
      'merge.border': uiColors.border,
      'merge.commonContentBackground': uiColors.selectionHighlight,
      'merge.commonHeaderBackground': uiColors.selection,

      // Overview Ruler
      'editorOverviewRuler.border': uiColors.border,
      'editorOverviewRuler.findMatchForeground': (uiColors.searchHighlight || uiColors.highlight),
      'editorOverviewRuler.rangeHighlightForeground': uiColors.accent,
      'editorOverviewRuler.selectionHighlightForeground': uiColors.selection,
      'editorOverviewRuler.wordHighlightForeground': uiColors.selectionHighlight,
      'editorOverviewRuler.wordHighlightStrongForeground': uiColors.selection,
      'editorOverviewRuler.modifiedForeground': uiColors.info,
      'editorOverviewRuler.addedForeground': uiColors.success,
      'editorOverviewRuler.deletedForeground': uiColors.error,
      'editorOverviewRuler.errorForeground': uiColors.error,
      'editorOverviewRuler.warningForeground': uiColors.warning,
      'editorOverviewRuler.infoForeground': uiColors.info,

      // Git Decorations
      'gitDecoration.modifiedResourceForeground': uiColors.info,
      'gitDecoration.deletedResourceForeground': uiColors.error,
      'gitDecoration.untrackedResourceForeground': uiColors.success,
      'gitDecoration.ignoredResourceForeground': uiColors.foregroundMuted,
      'gitDecoration.conflictingResourceForeground': uiColors.warning,

      // Breadcrumbs
      'breadcrumb.foreground': uiColors.foregroundMuted,
      'breadcrumb.background': uiColors.background,
      'breadcrumb.focusForeground': uiColors.foreground,
      'breadcrumb.activeSelectionForeground': uiColors.accent,
      'breadcrumbPicker.background': uiColors.backgroundLighter,

      // Menu
      'menu.background': uiColors.backgroundLighter,
      'menu.foreground': uiColors.foreground,
      'menu.selectionBackground': uiColors.selection,
      'menu.selectionForeground': uiColors.foreground,
      'menu.selectionBorder': uiColors.selection,
      'menu.separatorBackground': uiColors.border,

      // Settings
      'settings.headerForeground': uiColors.foreground,
      'settings.modifiedItemIndicator': uiColors.accent,
      'settings.dropdownBackground': uiColors.backgroundLighter,
      'settings.dropdownForeground': uiColors.foreground,
      'settings.dropdownBorder': uiColors.border,
      'settings.checkboxBackground': uiColors.backgroundLighter,
      'settings.checkboxForeground': uiColors.foreground,
      'settings.checkboxBorder': uiColors.border,
      'settings.textInputBackground': uiColors.backgroundLighter,
      'settings.textInputForeground': uiColors.foreground,
      'settings.textInputBorder': uiColors.border,
      'settings.numberInputBackground': uiColors.backgroundLighter,
      'settings.numberInputForeground': uiColors.foreground,
      'settings.numberInputBorder': uiColors.border,

      // Charts
      'charts.foreground': uiColors.foreground,
      'charts.lines': uiColors.foregroundMuted,
      'charts.red': uiColors.chartRed,
      'charts.blue': uiColors.chartBlue,
      'charts.yellow': uiColors.chartYellow,
      'charts.orange': uiColors.chartOrange,
      'charts.green': uiColors.chartGreen,
      'charts.purple': uiColors.chartPurple,

      // Quick Pick & Command Palette
      'quickInput.background': uiColors.backgroundLighter,
      'quickInput.foreground': uiColors.foreground,
      'quickInputTitle.background': uiColors.backgroundDarker,
      'quickInputList.focusBackground': uiColors.selection,
      'quickInputList.focusForeground': uiColors.foreground,
      'quickInputList.focusIconForeground': uiColors.accent,

      // Editor Widget (Search, Replace, etc.)
      'editorWidget.background': uiColors.backgroundLighter,
      'editorWidget.foreground': uiColors.foreground,
      'editorWidget.border': uiColors.border,
      'editorWidget.resizeBorder': uiColors.accent,
      'editorSuggestWidget.background': uiColors.backgroundLighter,
      'editorSuggestWidget.border': uiColors.border,
      'editorSuggestWidget.foreground': uiColors.foreground,
      'editorSuggestWidget.highlightForeground': uiColors.accent,
      'editorSuggestWidget.selectedBackground': uiColors.selection,
      'editorSuggestWidget.selectedForeground': uiColors.foreground,
      'editorSuggestWidget.selectedIconForeground': uiColors.accent,

      // Editor Hover Widget
      'editorHoverWidget.background': uiColors.backgroundLighter,
      'editorHoverWidget.foreground': uiColors.foreground,
      'editorHoverWidget.border': uiColors.border,
      'editorHoverWidget.statusBarBackground': uiColors.backgroundDarker,

      // Debug Console
      'debugConsole.infoForeground': uiColors.info,
      'debugConsole.warningForeground': uiColors.warning,
      'debugConsole.errorForeground': uiColors.error,
      'debugConsole.sourceForeground': uiColors.foreground,
      'debugConsoleInputIcon.foreground': uiColors.accent,

      // Welcome Page
      'welcomePage.background': uiColors.background,
      'welcomePage.buttonBackground': uiColors.backgroundLighter,
      'welcomePage.buttonHoverBackground': uiColors.selection,
      'welcomePage.progress.background': uiColors.backgroundLighter,
      'welcomePage.progress.foreground': uiColors.accent,
      'welcomePage.tileBackground': uiColors.backgroundLighter,
      'welcomePage.tileHoverBackground': uiColors.selection,
      'welcomePage.tileShadow': uiColors.backgroundDarker,

      // Walkthrough
      'walkThrough.embeddedEditorBackground': uiColors.backgroundLighter,

      // Git
      'gitDecoration.addedResourceForeground': uiColors.success,
      'gitDecoration.modifiedResourceForeground': uiColors.info,
      'gitDecoration.deletedResourceForeground': uiColors.error,
      'gitDecoration.renamedResourceForeground': uiColors.info,
      'gitDecoration.stageModifiedResourceForeground': uiColors.info,
      'gitDecoration.stageDeletedResourceForeground': uiColors.error,
      'gitDecoration.untrackedResourceForeground': uiColors.success,
      'gitDecoration.ignoredResourceForeground': uiColors.foregroundMuted,
      'gitDecoration.conflictingResourceForeground': uiColors.warning,
      'gitDecoration.submoduleResourceForeground': uiColors.accent,

      // Editor Gutter
      'editorGutter.background': uiColors.background,
      'editorGutter.modifiedBackground': uiColors.info,
      'editorGutter.addedBackground': uiColors.success,
      'editorGutter.deletedBackground': uiColors.error,
      'editorGutter.commentRangeForeground': uiColors.foregroundMuted,
      'editorGutter.foldingControlForeground': uiColors.foregroundMuted,

      // Minimap
      'minimap.background': uiColors.background,
      'minimap.findMatchHighlight': (uiColors.searchHighlight || uiColors.highlight) + '80',
      'minimap.selectionHighlight': uiColors.selection,
      'minimap.errorHighlight': uiColors.error,
      'minimap.warningHighlight': uiColors.warning,
      'minimapGutter.addedBackground': uiColors.success,
      'minimapGutter.modifiedBackground': uiColors.info,
      'minimapGutter.deletedBackground': uiColors.error,
      'minimapSlider.background': uiColors.foregroundMuted + '20',
      'minimapSlider.hoverBackground': uiColors.foregroundMuted + '30',
      'minimapSlider.activeBackground': uiColors.foregroundMuted + '40',

      // Editor Markers
      'editorError.foreground': uiColors.error,
      'editorError.border': uiColors.error + '00',
      'editorWarning.foreground': uiColors.warning,
      'editorWarning.border': uiColors.warning + '00',
      'editorInfo.foreground': uiColors.info,
      'editorInfo.border': uiColors.info + '00',
      'editorHint.foreground': uiColors.accent,
      'editorHint.border': uiColors.accent + '00',

      // Problem Panel
      'problemsErrorIcon.foreground': uiColors.error,
      'problemsWarningIcon.foreground': uiColors.warning,
      'problemsInfoIcon.foreground': uiColors.info,

      // Search Editor
      'searchEditor.findMatchBackground': (uiColors.searchHighlight || uiColors.highlight) + '40',
      'searchEditor.findMatchBorder': (uiColors.searchHighlight || uiColors.highlight),
      'searchEditor.textInputBorder': uiColors.border,

      // Symbol Icons
      'symbolIcon.arrayForeground': uiColors.chartOrange,
      'symbolIcon.booleanForeground': uiColors.chartBlue,
      'symbolIcon.classForeground': uiColors.chartYellow,
      'symbolIcon.colorForeground': uiColors.chartCyan,
      'symbolIcon.constantForeground': uiColors.chartRed,
      'symbolIcon.constructorForeground': uiColors.chartPurple,
      'symbolIcon.enumeratorForeground': uiColors.chartYellow,
      'symbolIcon.enumeratorMemberForeground': uiColors.chartBlue,
      'symbolIcon.eventForeground': uiColors.chartOrange,
      'symbolIcon.fieldForeground': uiColors.chartBlue,
      'symbolIcon.fileForeground': uiColors.foreground,
      'symbolIcon.folderForeground': uiColors.chartBlue,
      'symbolIcon.functionForeground': uiColors.chartPurple,
      'symbolIcon.interfaceForeground': uiColors.chartBlue,
      'symbolIcon.keyForeground': uiColors.chartCyan,
      'symbolIcon.keywordForeground': uiColors.chartPurple,
      'symbolIcon.methodForeground': uiColors.chartPurple,
      'symbolIcon.moduleForeground': uiColors.chartYellow,
      'symbolIcon.namespaceForeground': uiColors.chartYellow,
      'symbolIcon.nullForeground': uiColors.chartRed,
      'symbolIcon.numberForeground': uiColors.chartGreen,
      'symbolIcon.objectForeground': uiColors.chartOrange,
      'symbolIcon.operatorForeground': uiColors.chartCyan,
      'symbolIcon.packageForeground': uiColors.chartYellow,
      'symbolIcon.propertyForeground': uiColors.chartRed,
      'symbolIcon.referenceForeground': uiColors.chartBlue,
      'symbolIcon.snippetForeground': uiColors.chartGreen,
      'symbolIcon.stringForeground': uiColors.chartGreen,
      'symbolIcon.structForeground': uiColors.chartYellow,
      'symbolIcon.textForeground': uiColors.foreground,
      'symbolIcon.typeParameterForeground': uiColors.chartOrange,
      'symbolIcon.unitForeground': uiColors.chartGreen,
      'symbolIcon.variableForeground': uiColors.chartRed
    },
    tokenColors: [
      {
        name: 'Comments',
        scope: [
          'comment',
          'punctuation.definition.comment'
        ],
        settings: {
          fontStyle: 'italic',
          foreground: syntaxColors.comment
        }
      },
      {
        name: 'Strings',
        scope: [
          'string',
          'string.quoted',
          'string.template'
        ],
        settings: {
          foreground: syntaxColors.string
        }
      },
      {
        name: 'String Punctuation',
        scope: [
          'punctuation.definition.string.begin',
          'punctuation.definition.string.end',
          'punctuation.definition.string.template.begin',
          'punctuation.definition.string.template.end',
          'string.quoted.single punctuation.definition.string',
          'string.quoted.double punctuation.definition.string',
          'string.quoted.triple punctuation.definition.string',
          'string.template punctuation.definition.string'
        ],
        settings: {
          foreground: syntaxColors.string
        }
      },
      {
        name: 'String Escape',
        scope: [
          'constant.character.escape',
          'string constant.other.placeholder'
        ],
        settings: {
          foreground: syntaxColors.escape
        }
      },
      {
        name: 'Numbers',
        scope: [
          'constant.numeric',
          'constant.language.boolean',
          'constant.language.null',
          'constant.language.undefined'
        ],
        settings: {
          foreground: syntaxColors.number
        }
      },
      {
        name: 'Keywords',
        scope: [
          'keyword',
          'storage.type',
          'storage.modifier'
        ],
        settings: {
          foreground: syntaxColors.keyword
        }
      },
      {
        name: 'Keywords Control',
        scope: [
          'keyword.control',
          'keyword.operator.new',
          'keyword.operator.expression',
          'keyword.operator.cast',
          'keyword.operator.sizeof',
          'keyword.operator.logical.python'
        ],
        settings: {
          foreground: syntaxColors.keyword
        }
      },
      {
        name: 'Functions',
        scope: [
          'entity.name.function',
          'meta.function-call',
          'variable.function',
          'keyword.other.special-method'
        ],
        settings: {
          foreground: syntaxColors.function
        }
      },
      {
        name: 'Support',
        scope: [
          'support.function',
          'support.class',
          'support.type',
          'support.constant'
        ],
        settings: {
          foreground: syntaxColors.support
        }
      },
      {
        name: 'Classes',
        scope: [
          'entity.name.class',
          'entity.name.type.class',
          'meta.class',
          'entity.name.type'
        ],
        settings: {
          foreground: syntaxColors.className
        }
      },
      {
        name: 'Method Definition',
        scope: [
          'entity.name.method',
          'entity.name.function.method'
        ],
        settings: {
          foreground: syntaxColors.function
        }
      },
      {
        name: 'Variables',
        scope: [
          'variable',
          'string constant.other.placeholder'
        ],
        settings: {
          foreground: syntaxColors.variable
        }
      },
      {
        name: 'Variables: Other Property',
        scope: [
          'variable.other.property'
        ],
        settings: {
          foreground: syntaxColors.property
        }
      },
      {
        name: 'Language Constants',
        scope: [
          'constant.language',
          'support.constant',
          'variable.language'
        ],
        settings: {
          foreground: syntaxColors.constant
        }
      },
      {
        name: 'Operators',
        scope: [
          'keyword.operator',
          'keyword.operator.comparison',
          'keyword.operator.assignment',
          'keyword.operator.arithmetic'
        ],
        settings: {
          foreground: syntaxColors.operator
        }
      },
      {
        name: 'Punctuation',
        scope: [
          'punctuation',
          'meta.brace',
          'meta.delimiter'
        ],
        settings: {
          foreground: syntaxColors.punctuation
        }
      },
      {
        name: 'Types',
        scope: [
          'entity.name.type',
          'entity.other.inherited-class',
          'support.type'
        ],
        settings: {
          foreground: syntaxColors.type
        }
      },
      {
        name: 'Tag',
        scope: [
          'entity.name.tag',
          'meta.tag.sgml',
          'markup.deleted.git_gutter'
        ],
        settings: {
          foreground: syntaxColors.tag
        }
      },
      {
        name: 'Tag Attribute',
        scope: [
          'entity.other.attribute-name',
          'meta.tag.attributes',
          'entity.other.attribute-name.html'
        ],
        settings: {
          foreground: syntaxColors.attribute
        }
      },
      {
        name: 'CSS Classes',
        scope: [
          'entity.other.attribute-name.class'
        ],
        settings: {
          foreground: syntaxColors.className
        }
      },
      {
        name: 'CSS ID\'s',
        scope: [
          'source.sass keyword.control'
        ],
        settings: {
          foreground: syntaxColors.function
        }
      },
      {
        name: 'Inserted',
        scope: [
          'markup.inserted'
        ],
        settings: {
          foreground: syntaxColors.string
        }
      },
      {
        name: 'Deleted',
        scope: [
          'markup.deleted'
        ],
        settings: {
          foreground: syntaxColors.variable
        }
      },
      {
        name: 'Changed',
        scope: [
          'markup.changed'
        ],
        settings: {
          foreground: syntaxColors.keyword
        }
      },
      {
        name: 'Regular Expressions',
        scope: [
          'string.regexp'
        ],
        settings: {
          foreground: syntaxColors.string
        }
      },
      {
        name: 'Escape Characters',
        scope: [
          'constant.character.escape'
        ],
        settings: {
          foreground: syntaxColors.constant
        }
      },
      {
        name: 'Embedded',
        scope: [
          'punctuation.section.embedded',
          'variable.interpolation'
        ],
        settings: {
          foreground: syntaxColors.keyword
        }
      },
      {
        name: 'Illegal',
        scope: [
          'invalid.illegal'
        ],
        settings: {
          foreground: syntaxColors.variable
        }
      },
      {
        name: 'JSON Key - Level 0',
        scope: [
          'source.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: syntaxColors.property
        }
      },
      {
        name: 'JSON Key - Level 1',
        scope: [
          'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: syntaxColors.className
        }
      },
      {
        name: 'JSON Key - Level 2',
        scope: [
          'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: syntaxColors.function
        }
      },
      {
        name: 'Markdown - Plain',
        scope: [
          'text.html.markdown',
          'punctuation.definition.list_item.markdown'
        ],
        settings: {
          foreground: syntaxColors.punctuation
        }
      },
      {
        name: 'Markdown - Markup Raw Inline',
        scope: [
          'text.html.markdown markup.inline.raw.markdown'
        ],
        settings: {
          foreground: syntaxColors.string
        }
      },
      {
        name: 'Markdown - Markup Raw Inline Punctuation',
        scope: [
          'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown'
        ],
        settings: {
          foreground: syntaxColors.comment
        }
      },
      {
        name: 'Markdown - Line Break',
        scope: [
          'text.html.markdown meta.dummy.line-break'
        ],
        settings: {
          foreground: syntaxColors.comment
        }
      },
      {
        name: 'Markdown - Heading',
        scope: [
          'markdown.heading',
          'markup.heading | markup.heading entity.name',
          'markup.heading.markdown punctuation.definition.heading.markdown'
        ],
        settings: {
          foreground: syntaxColors.function
        }
      },
      {
        name: 'Markdown - Blockquote',
        scope: [
          'markup.quote punctuation.definition.blockquote.markdown'
        ],
        settings: {
          foreground: syntaxColors.comment
        }
      },
      {
        name: 'Markdown - Link',
        scope: [
          'markup.underline.link.markdown'
        ],
        settings: {
          foreground: syntaxColors.function
        }
      },
      {
        name: 'Markdown - Raw Block Fenced',
        scope: [
          'markup.raw.block.fenced.markdown'
        ],
        settings: {
          foreground: syntaxColors.punctuation
        }
      },
      {
        name: 'Markdown - Fenced Bode Block',
        scope: [
          'punctuation.definition.fenced.markdown'
        ],
        settings: {
          foreground: syntaxColors.comment
        }
      },
      {
        name: 'Markdown - Fenced Language',
        scope: [
          'variable.language.fenced.markdown',
          'support.other.language.name.fenced.markdown'
        ],
        settings: {
          foreground: syntaxColors.comment
        }
      },
      {
        name: 'Markdown - Separator',
        scope: [
          'meta.separator'
        ],
        settings: {
          fontStyle: 'bold',
          foreground: syntaxColors.comment
        }
      }
    ]
  };
}

function writeThemeFile(themeMetadata, theme) {
  // Create themes directory if it doesn't exist
  const themesDir = path.join(__dirname, '..', 'replicant', 'themes');
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  // Write theme file
  const themeFile = path.join(themesDir, themeMetadata.fileName);
  fs.writeFileSync(themeFile, JSON.stringify(theme, null, 2));

  console.log(`Theme generated successfully: ${themeFile}`);
  return themeFile;
}

// Create or update package.json for VS Code extension
function createOrUpdatePackageJson(themes) {
  const packageJsonPath = path.join(__dirname, '..', 'replicant', 'package.json');

  let packageJson;

  // Check if package.json already exists and is valid
  if (fs.existsSync(packageJsonPath)) {
    try {
      const existingContent = fs.readFileSync(packageJsonPath, 'utf8');
      packageJson = JSON.parse(existingContent);

      // Validate that this is a VS Code extension package
      const isValidVSCodeExtension = packageJson.engines && packageJson.engines.vscode;

      if (!isValidVSCodeExtension) {
        console.log('Existing package.json is not a VS Code extension, creating new one');
        packageJson = createNewPackageJson(themes);
      } else {
        // Check if it's the same package (name, author, publisher match)
        const isSamePackage =
          packageJson.name === packageMetadata.name &&
          packageJson.author === packageMetadata.author &&
          packageJson.publisher === packageMetadata.publisher;

        if (isSamePackage) {
          // Update existing package.json
          console.log('Found existing VS Code extension package with matching details');

          // Update metadata (version, description, etc.)
          packageJson.displayName = packageMetadata.displayName;
          packageJson.description = packageMetadata.description;
          packageJson.version = packageMetadata.version;
          packageJson.engines = packageMetadata.engines;

          // Ensure categories include 'Themes'
          if (!packageJson.categories) {
            packageJson.categories = ['Themes'];
          } else if (!packageJson.categories.includes('Themes')) {
            packageJson.categories.push('Themes');
          }

          // Ensure contributes and themes arrays exist
          if (!packageJson.contributes) {
            packageJson.contributes = {};
          }
          if (!packageJson.contributes.themes) {
            packageJson.contributes.themes = [];
          }

          // Update themes array
          packageJson.contributes.themes = themes;
          console.log(`Updated package with ${themes.length} themes`);
        } else {
          // Different package - prompt user or create backup
          console.log('Warning: Existing package.json belongs to a different extension');
          console.log(`Existing: ${packageJson.name} by ${packageJson.author || packageJson.publisher}`);
          console.log(`New: ${packageMetadata.name} by ${packageMetadata.author}`);

          // Create backup of existing package.json
          const backupPath = `package.json.backup.${Date.now()}`;
          fs.copyFileSync(packageJsonPath, backupPath);
          console.log(`Backed up existing package.json to: ${backupPath}`);

          // Create new package.json
          packageJson = createNewPackageJson(themes);
          console.log('Created new package.json for this extension');
        }
      }
    } catch (error) {
      console.log('Error reading existing package.json, creating new one:', error.message);
      packageJson = createNewPackageJson(themes);
    }
  } else {
    // Create new package.json
    console.log('No existing package.json found, creating new one');
    packageJson = createNewPackageJson(themes);
  }

  // Write the package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Package.json updated successfully');

  // Log all themes in the package
  if (packageJson.contributes?.themes?.length > 1) {
    console.log(`Package now contains ${packageJson.contributes.themes.length} themes:`);
    packageJson.contributes.themes.forEach((theme, index) => {
      console.log(`  ${index + 1}. ${theme.label}`);
    });
  }
}

// Helper function to create a new package.json structure
function createNewPackageJson(themes) {
  return {
    name: packageMetadata.name,
    displayName: packageMetadata.displayName,
    description: packageMetadata.description,
    version: packageMetadata.version,
    publisher: packageMetadata.publisher,
    author: packageMetadata.author,
    engines: packageMetadata.engines,
    categories: ['Themes'],
    contributes: {
      themes: themes
    }
  };
}

// Generate themes from color palettes
function generateAllThemes() {
  const blueColors = require('./colors-blue');
  const oneColors = require('./colors-one');

  // Generate themes
  const blueTheme = generateTheme(blueColors.themeMetadata, blueColors.uiColors, blueColors.syntaxColors);
  const oneTheme = generateTheme(oneColors.themeMetadata, oneColors.uiColors, oneColors.syntaxColors);

  // Write theme files
  writeThemeFile(blueColors.themeMetadata, blueTheme);
  writeThemeFile(oneColors.themeMetadata, oneTheme);

  // Create theme entries for package.json
  const themes = [
    {
      label: blueColors.themeMetadata.name,
      uiTheme: blueColors.themeMetadata.uiTheme,
      path: `./themes/${blueColors.themeMetadata.fileName}`
    },
    {
      label: oneColors.themeMetadata.name,
      uiTheme: oneColors.themeMetadata.uiTheme,
      path: `./themes/${oneColors.themeMetadata.fileName}`
    }
  ];

  // Update package.json
  createOrUpdatePackageJson(themes);
}

// Run the script
if (require.main === module) {
  generateAllThemes();
}

module.exports = { generateTheme, generateAllThemes, packageMetadata };
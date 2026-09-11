<template>
  <div class="rich-text-editor">
    <!--
      TODO: Build formatting controls here.
      Required: paragraphs, bold, italic, and one list style (bulleted or
      numbered), plus undo and redo. Additional formatting, including the
      other list style, is optional.
      - Full command reference: https://tiptap.dev/docs/editor/api/commands

      One example button is included below to show the wiring pattern.
      Replace it with your full toolbar.
    -->
    <div class="toolbar" role="toolbar" aria-label="Text formatting">
      <button
        type="button"
        @click="editor?.chain().focus().undo().run()"
        v-tooltip="'Undo (Ctrl/Cmd+Z)'"
      >
        <v-icon name="md-undo-round" />
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().redo().run()"
        v-tooltip="'Redo (Ctrl/Cmd+Y)'"
      >
        <v-icon name="md-redo-round" />
      </button>
        <button
        type="button"
        :aria-pressed="editor?.isActive('bold') ?? false"
        @click="editor?.chain().focus().toggleBold().run()"
        v-tooltip="'Bold (Ctrl/Cmd+B)'"
      >
        <v-icon name="oi-bold" />
      </button>
      <button
        type="button"
        :aria-pressed="editor?.isActive('italic') ?? false"
        @click="editor?.chain().focus().toggleItalic().run()"
        v-tooltip="'Italic (Ctrl/Cmd+I)'"
      >
        <v-icon name="oi-italic" />
      </button>
      <button
        type="button"
        :aria-pressed="editor?.isActive('strike') ?? false"
        @click="editor?.chain().focus().toggleStrike().run()"
        v-tooltip="'Strike (Ctrl/Cmd+Shift+S)'"
      >
        <v-icon name="oi-strikethrough" />
      </button>
      <button
        type="button"
        :aria-pressed="editor?.isActive('orderedList') ?? false"
        @click="editor?.chain().focus().toggleOrderedList().run()"
        v-tooltip="'Ordered List (Ctrl/Cmd+Shift+7)'"
      >
        <v-icon name="md-formatlistnumbered-round" />
      </button>
      <button
        type="button"
        :aria-pressed="editor?.isActive('bulletList') ?? false"
        @click="editor?.chain().focus().toggleBulletList().run()"
        v-tooltip="'Bullet List (Ctrl/Cmd+Shift+8)'"
      >
        <v-icon name="bi-list-ul" />
      </button>
      <button
        type="button"
        :aria-pressed="editor?.isActive('paragraph') ?? false"
        @click="editor?.chain().focus().setParagraph().run()"
        v-tooltip="'Paragraph (Ctrl/Cmd+Alt+0)'"
      >
        <v-icon name="co-paragraph"/>
      </button>
    </div>

    <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  extensions: [StarterKit],
  content: props.modelValue,
  onUpdate: ({ editor: currentEditor }) => {
    emit('update:modelValue', currentEditor.getHTML());
  },
});

watch(
  () => props.modelValue,
  value => {
    if (!editor.value) returnl
    const isSame = value === editor.value.getHTML();
    if (!isSame) {
      editor.value.commands.setContent(value || '', { emitUpdate: false });
    }
  },
);

defineExpose({ editor });
</script>

<style scoped>
.rich-text-editor {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #fff;
}

.toolbar {
  display: flex;
  gap: 4px;
  padding: 6px;
  border-bottom: 1px solid #d0d7de;
}

.toolbar button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  color: inherit;
}

.toolbar button:hover {
  background: #f6f8fa;
}

.toolbar button[aria-pressed='true'] {
  background: #ddf4ff;
  border-color: #54aeff;
}

.editor-content {
  padding: 10px;
  min-height: 120px;
}

.editor-content :deep(p) {
  margin: 0 0 8px;
}

.editor-content :deep(ul),
.editor-content :deep(ol) {
  margin: 0 0 8px;
  padding-left: 24px;
}

.editor-content :deep(ul) {
  list-style-type: disc;
}

.editor-content :deep(ol) {
  list-style-type: decimal;
}

.editor-content :deep(li) {
  list-style: inherit;
}

.editor-content :deep(ul ul) {
  list-style-type: circle;
}

.editor-content :deep(ul ul ul) {
  list-style-type: square;
}

.editor-content :deep(.ProseMirror) {
  outline: none;
}

.editor-content :deep(.ProseMirror:focus-visible) {
  outline: none;
}
</style>

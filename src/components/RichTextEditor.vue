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
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

// StarterKit includes bold, italic, bullet list, ordered list,
// undo/redo (via history), paragraphs, and more. You likely won't need
// to add extensions for the required formatting, but you're free to.
const editor = new Editor({
  extensions: [StarterKit],
  content: props.modelValue,
  onUpdate: ({ editor: currentEditor }) => {
    emit('update:modelValue', currentEditor.getHTML());
  },
});

// Keeps the editor in sync if modelValue is changed from outside this
// component (for example, loaded from storage after a refresh).
watch(
  () => props.modelValue,
  value => {
    const isSame = value === editor.getHTML();
    if (!isSame) {
      editor.commands.setContent(value || '', false);
    }
  },
);

onBeforeUnmount(() => {
  editor.destroy();
});

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
</style>

<template>
  <div class="flipbox-builder">
    <div class="field">
      <label for="front-editor" class="text-xl font-semibold">Front</label>
      <RichTextEditor id="front-editor" v-model="front" />
    </div>

    <div class="field">
      <label for="back-editor" class="text-xl font-semibold">Back</label>
      <RichTextEditor id="back-editor" v-model="back" />
    </div>

    <!--
      Reset button added to clear builder content without need to manually delete
    -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="cursor-pointer rounded-md border border-[#d0d7de] bg-white px-4 py-2 font-[inherit] hover:bg-[#f6f8fa] disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="isEmpty"
        @click="handleReset"
      >
        Reset Card Content
      </button>

      <p class="sr-only" role="status" aria-live="polite">{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script setup>
/*

*/
import { computed, ref } from 'vue';
import RichTextEditor from './RichTextEditor.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const statusMessage = ref('');

const front = computed({
  get: () => props.modelValue.front,
  set: (value) => emit('update:modelValue', { ...props.modelValue, front: value }),
});

const back = computed({
  get: () => props.modelValue.back,
  set: (value) => emit('update:modelValue', { ...props.modelValue, back: value }),
});

function hasContent(html) {
  if (!html) return false;
  return html.replace(/<[^>]*>/g, '').trim().length > 0;
}

const isEmpty = computed(
  () => !hasContent(props.modelValue.front) && !hasContent(props.modelValue.back)
);

function handleReset() {
  if (!window.confirm('Clear both sides of the flipbox? This cannot be undone.')) {
    return;
  }

  emit('update:modelValue', { ...props.modelValue, front: '', back: '' });
  statusMessage.value = 'Flipbox cleared';
}
</script>

<style scoped>
.flipbox-builder {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}
</style>

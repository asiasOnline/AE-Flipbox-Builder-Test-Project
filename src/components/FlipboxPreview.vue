<template>
  <div class="flipbox-preview">
    <!--
      - Flip interaction integrated with front of card displayed initially
      - Dynamic button to let user flip card back and forth
      - Builder content and formatting maintained via live updates
      - The current card side is communicated 
      - Checkbox is also incorporated allowing users to toggle single versus dual view of front and back of the card
    -->
    <div class="self-start">
      <label class="flex cursor-pointer select-none items-center gap-2">
        <input type="checkbox" v-model="showBothSides" />
        Show both sides of card
      </label>
    </div>

    <!-- Both sides at once -->
    <div v-if="showBothSides" class="flex flex-col items-center gap-3">
      <div>
        <h4 class="mb-2 font-semibold">Front</h4>
        <div class="flipbox-content w-70 min-h-45 rounded-lg border border-[#d0d7de] bg-white p-4">
          <div v-if="hasFront" v-html="flipbox.front"></div>
          <p v-else class="m-0 italic opacity-55">Nothing on the front yet.</p>
        </div>
      </div>

      <div>
        <h4 class="mb-2 font-semibold">Back</h4>
        <div class="flipbox-content w-70 min-h-45 rounded-lg border border-[#d0d7de] bg-white p-4">
          <div v-if="hasBack" v-html="flipbox.back"></div>
          <p v-else class="m-0 italic opacity-55">Nothing on the back yet.</p>
        </div>
      </div>
    </div>

    <!-- One side at a time -->
    <div v-else class="flex flex-col items-center gap-3">
      <h4 class="m-0 font-semibold">
        {{ isFlipped ? 'Back' : 'Front' }}
      </h4>

      <div class="cursor-pointer perspective-[1000px]" @click="toggleFlip">
        <div
          class="grid transform-3d transition-transform duration-500 ease-in-out motion-reduce:transition-none"
          :class="isFlipped ? 'rotate-y-180' : 'rotate-y-0'"
        >
          <div
            class="flipbox-content col-start-1 row-start-1 w-70 min-h-45 rounded-lg border border-[#d0d7de] bg-white p-4 backface-hidden"
            :aria-hidden="isFlipped"
          >
            <div v-if="hasFront" v-html="flipbox.front"></div>
            <p v-else class="m-0 italic opacity-55">Nothing on the front yet.</p>
          </div>

          <div
            class="flipbox-content col-start-1 row-start-1 w-70 min-h-45 rotate-y-180 rounded-lg border border-[#d0d7de] bg-white p-4 backface-hidden"
            :aria-hidden="!isFlipped"
          >
            <div v-if="hasBack" v-html="flipbox.back"></div>
            <p v-else class="m-0 italic opacity-55">Nothing on the back yet.</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="cursor-pointer rounded-md border border-[#d0d7de] bg-white px-4 py-2 font-[inherit] hover:bg-[#f6f8fa]"
        :aria-pressed="isFlipped"
        @click="toggleFlip"
      >
        Flip to {{ isFlipped ? 'front' : 'back' }}
      </button>

      <p class="sr-only" role="status" aria-live="polite">
        {{ isFlipped ? 'Showing back of flipbox' : 'Showing front of flipbox' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  flipbox: {
    type: Object,
    required: true,
  },
});

const isFlipped = ref(false);
const showBothSides = ref(false);

function toggleFlip() {
  isFlipped.value = !isFlipped.value;
}

function hasContent(html) {
  if (!html) return false;
  return html.replace(/<[^>]*>/g, '').trim().length > 0;
}

const hasFront = computed(() => hasContent(props.flipbox.front));
const hasBack = computed(() => hasContent(props.flipbox.back));
</script>

<style scoped>
.flipbox-content :deep(p) {
  margin: 0 0 8px;
}

.flipbox-content :deep(ul),
.flipbox-content :deep(ol) {
  margin: 0 0 8px;
  padding-left: 24px;
}

.flipbox-content :deep(ul) {
  list-style-type: disc;
}

.flipbox-content :deep(ol) {
  list-style-type: decimal;
}

.flipbox-content :deep(li) {
  list-style: inherit;
}
</style>
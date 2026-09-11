<template>
  <div class="flipbox-preview">
    <!--
      TODO: Build the flip interaction here.
      - Show the front of the flipbox by default and let the user reveal
        the back.
      - Let the user flip back and forth between front and back.
      - Reflect the builder content and formatting accurately (this
        component already receives live updates via the `flipbox` prop).
      - Communicate the current side (front or back) in a way that does
        not rely only on the visual flip animation - think about both
        sighted users who might miss the animation and screen reader
        users.

      The markup below is only a placeholder showing the front content.
      Replace it with your flipbox structure and interaction.
    -->
    <div class="preview-controls">
      <label class="toggle">
        <input type="checkbox" v-model="showBothSides" />
        Show both sides
      </label>
    </div>

    <!-- Both sides at once -->
    <div v-if="showBothSides" class="both-sides">
      <div>
        <h4 id="front-label">Front</h4>
        <div class="flipbox">
          <div class="flipbox-content">
            <div v-if="hasFront" v-html="flipbox.front"></div>
            <p v-else class="empty">Nothing on the front yet.</p>
          </div>
        </div>
      </div>

      <div>
        <h4 id="back-label">Back</h4>
        <div class="flipbox">
          <div class="flipbox-content">
            <div v-if="hasBack" v-html="flipbox.back"></div>
            <p v-else class="empty">Nothing on the back yet.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- One side at a time -->
    <div v-else class="single-side">
      <h4 class="side-indicator">
        Showing: {{ isFlipped ? 'Back' : 'Front' }}
      </h4>

      <div class="scene" @click="toggleFlip">
        <div class="flipbox-card" :class="{ 'is-flipped': isFlipped }">
          <div class="flipbox face-front" :aria-hidden="isFlipped">
            <div class="flipbox-content">
              <div v-if="hasFront" v-html="flipbox.front"></div>
              <p v-else class="empty">Nothing on the front yet.</p>
            </div>
          </div>

          <div class="flipbox face-back" :aria-hidden="!isFlipped">
            <div class="flipbox-content">
              <div v-if="hasBack" v-html="flipbox.back"></div>
              <p v-else class="empty">Nothing on the back yet.</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="flip-button"
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

// The rich text editor emits markup like "<p></p>" for an empty document,
// which is truthy — so strip tags before deciding whether a side is empty.
function hasContent(html) {
  if (!html) return false;
  return html.replace(/<[^>]*>/g, '').trim().length > 0;
}

const hasFront = computed(() => hasContent(props.flipbox.front));
const hasBack = computed(() => hasContent(props.flipbox.back));
</script>

<style scoped>
.flipbox-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.preview-controls {
  align-self: flex-start;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.both-sides,
.single-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.side-indicator {
  margin: 0;
}

.scene {
  perspective: 1000px;
  cursor: pointer;
}

.flipbox-card {
  display: grid;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.flipbox-card.is-flipped {
  transform: rotateY(180deg);
}

/* Both faces share one grid cell so they stack without absolute
   positioning — the card still grows to fit the taller side. */
.flipbox-card .flipbox {
  grid-area: 1 / 1;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.face-back {
  transform: rotateY(180deg);
}

.flip-button {
  padding: 8px 16px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #fff;
  font: inherit;
  cursor: pointer;
}

.flip-button:hover {
  background: #f6f8fa;
}

.empty {
  margin: 0;
  opacity: 0.55;
  font-style: italic;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .flipbox-card {
    transition: none;
  }
}
</style>

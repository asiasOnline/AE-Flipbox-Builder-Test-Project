import { createApp } from 'vue';
import App from './App.vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { OiBold, BiListUl, CoParagraph, OiItalic, OiStrikethrough, MdFormatlistnumberedRound, MdUndoRound, MdRedoRound, CoHighlighter, IoTrashOutline } from "oh-vue-icons/icons";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import './style.css';

addIcons(OiBold, BiListUl, CoParagraph, OiItalic, OiStrikethrough, MdFormatlistnumberedRound, MdUndoRound, MdRedoRound, CoHighlighter, IoTrashOutline )

const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(FloatingVue)
app.mount('#app');

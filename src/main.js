import { createApp } from 'vue';
import App from './App.vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { OiBold, BiListUl, CoParagraph, OiItalic, OiStrikethrough, MdFormatlistnumberedRound, MdUndoRound, MdRedoRound, CoHighlighter } from "oh-vue-icons/icons";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import './style.css';

addIcons(OiBold, BiListUl, CoParagraph, OiItalic, OiStrikethrough, MdFormatlistnumberedRound, MdUndoRound, MdRedoRound, CoHighlighter )

const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(FloatingVue)
app.mount('#app');

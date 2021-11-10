export default {
	props: ['notes'],
	template: `<ul class="notes-list">
              <li class="note" v-for="note in notes" :key="note.id"></li>
            </ul>`,
};

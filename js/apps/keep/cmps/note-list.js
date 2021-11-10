export default {
  props: ['notes'],
  template: `
  <section class="note-list-container">
    <ul v-if="notes&&notes.length" class="notes-list">
      <li class="note" v-for="note in notes" :key="note.id">
        {{note.txt}}
      </li>
    </ul>
    <div v-else>
      <p>No Notes</p>
    </div>
  </section>
  `,
};

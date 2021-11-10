export default {
  props: ['notes'],
  template: `
  <section class="clean-list">
    <ul v-if="notes&&notes.length" class="note-list">
      <li class="note" v-for="note in notes" :key="note.id" :style="{
        backgroundColor : note.style.bgc}">
        {{note.txt}} 
        <div class="actions">
             <button class="btn" @click="remove(mail.id)">
                 <ion-icon name="trash-outline"></ion-icon>
              </button>
         </div>
      </li> 
    </ul>
    <div v-else>
      <p>No Notes</p>
    </div>
  </section>
  `,
};

<template>
  <div class="w-full p-4 bg-white rounded-lg shadow-lg">
    <div v-if="test.isEditing">
      <input
        v-model="newTitle"
        type="text"
        @blur="onSaveTitle"
        @keyup.enter="onSaveTitle"
        class="input border-2 border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
        placeholder="Введите новое название"
      />
    </div>
    <div v-else>
      <h2 class="px-20 text-xl font-bold">{{ test.name }}</h2>
    </div>

    <div class="px-20 mt-2 flex justify-between">
      <button @click="onOpenQuestions" class="btn-primary">Посмотреть вопросы</button>
      <button v-if="!test.isEditing" @click="onEditTitle" class="btn-secondary">Редактировать название</button>
      <button class="btn-secondary" @click="onDelete">Удалить тест</button>
      <button @click="onAddQuestion" class="btn-secondary">Добавить вопрос</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    test: {
      type: Object as PropType<{ name: string; id: number; isEditing?: boolean }>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const newTitle = ref(props.test.name);

    const onOpenQuestions = () => {
      emit("open-questions"); // Сигнализируем родителю о нажатии кнопки
    };

    const onEditTitle = () => {
      emit("edit-title");
      props.test.isEditing = true;
    };

    const onDelete = () => {
      emit("delete");
    };

    const onAddQuestion = () => {
      emit("add-question");
    };

    const onSaveTitle = () => {
      if (newTitle.value.trim() !== "") {
        emit("save-title", newTitle.value);
        props.test.name = newTitle.value;
        props.test.isEditing = false;
      }
    };

    return {
      newTitle,
      onOpenQuestions,
      onEditTitle,
      onAddQuestion,
      onSaveTitle,
      onDelete,
    };
  },
});
</script>

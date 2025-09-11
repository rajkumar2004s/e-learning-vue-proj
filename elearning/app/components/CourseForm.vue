<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-[#1c2533] text-white rounded-lg shadow-lg p-6 w-full max-w-lg"
    >
      <h2 class="text-xl font-bold mb-4 text-white">
        {{ editingCourse ? "Edit Course" : "Add New Course" }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white p-1">Title</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white p-1"
            >Description</label
          >
          <textarea
            v-model="form.description"
            required
            class="w-full border rounded p-2"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-white">Image URL</label>
          <input
            v-model="form.imgUrl"
            type="text"
            required
            class="w-full border rounded p-2"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-white">Price</label>
            <input
              v-model.number="form.price"
              type="number"
              required
              class="w-full border rounded p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-white">MRP</label>
            <input
              v-model.number="form.mrp"
              type="number"
              required
              class="w-full border rounded p-2"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-white">Rating</label>
          <input
            v-model.number="form.rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            required
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white">Professor</label>
          <input
            v-model="form.professor"
            type="text"
            required
            class="w-full border rounded p-2"
          />
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="handleCancel"
            class="px-4 py-2 bg-red-500 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {{ editingCourse ? "Update" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useCourseStore } from "@/stores/courses";

const course = useCourseStore();

const editingCourse = computed(() =>
  course.courses.find((c) => c.id === course.editingCourseId)
);

const form = reactive({
  id: "",
  title: "",
  description: "",
  imgUrl: "",
  price: 0,
  mrp: 0,
  rating: 0,
  professor: "",
});

watch(
  editingCourse,
  (val) => {
    if (val) Object.assign(form, val);
    else {
      Object.assign(form, {
        id: "",
        title: "",
        description: "",
        imgUrl: "",
        price: 0,
        mrp: 0,
        rating: 0,
        professor: "",
      });
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (editingCourse.value) {
    await course.updateCourse(form);
  } else {
    await course.addCourse(form);
  }
};

const handleCancel = () => {
  if (editingCourse.value) course.closeEditCourse();
  else course.toggleNewCourse();
};
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold">Purchased Courses</h2>
        <p class="text-2xl">{{ overview.purchasedCourses }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold">New Users</h2>
        <p class="text-2xl">{{ overview.newUsers }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold">Follow Ups</h2>
        <p class="text-2xl">{{ overview.followUps }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold">Active Leads</h2>
        <p class="text-2xl">{{ overview.activeLeads }}</p>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Manage Courses</h2>

      <form @submit.prevent="addCourse" class="flex gap-4 mb-4">
        <input
          v-model="newCourse.title"
          placeholder="Course Title"
          class="p-2 border rounded flex-1"
          required
        />
        <input
          v-model="newCourse.price"
          type="number"
          placeholder="Price"
          class="p-2 border rounded w-32"
          required
        />
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>

      <table class="w-full bg-white rounded shadow">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">Title</th>
            <th class="p-2 text-left">Price</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(course, index) in courses"
            :key="index"
            class="border-b hover:bg-gray-50"
          >
            <td class="p-2">{{ course.title }}</td>
            <td class="p-2">{{ course.price }}</td>
            <td class="p-2 text-center space-x-2">
              <button
                @click="editCourse(index)"
                class="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                @click="deleteCourse(index)"
                class="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4">Lead Management</h2>

      <table class="w-full bg-white rounded shadow">
        <thead>
          <tr class="border-b bg-gray-100">
            <th class="p-2 text-left">Name</th>
            <th class="p-2 text-left">Email</th>
            <th class="p-2 text-left">Course</th>
            <th class="p-2 text-left">Status</th>
            <th class="p-2 text-center">Follow Up</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(lead, index) in leads"
            :key="index"
            class="border-b hover:bg-gray-50"
          >
            <td class="p-2">{{ lead.name }}</td>
            <td class="p-2">{{ lead.email }}</td>
            <td class="p-2">{{ lead.course }}</td>
            <td class="p-2">{{ lead.status }}</td>
            <td class="p-2 text-center">
              <button
                @click="followUp(index)"
                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Follow Up
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overview: {
        purchasedCourses: 42,
        newUsers: 15,
        followUps: 8,
        activeLeads: 27,
      },
      newCourse: {
        title: "",
        price: "",
      },
      courses: [
        { title: "Vue.js Basics", price: 99 },
        { title: "Advanced Vue Techniques", price: 199 },
      ],
      leads: [
        {
          name: "Alice Johnson",
          email: "alice@example.com",
          course: "Vue.js Basics",
          status: "Interested",
        },
        {
          name: "Bob Smith",
          email: "bob@example.com",
          course: "Advanced Vue Techniques",
          status: "Pending",
        },
      ],
    };
  },
  methods: {
    addCourse() {
      this.courses.push({ ...this.newCourse });
      this.newCourse.title = "";
      this.newCourse.price = "";
    },
    editCourse(index) {
      const title = prompt("Edit Course Title", this.courses[index].title);
      const price = prompt("Edit Price", this.courses[index].price);
      if (title && price) {
        this.courses[index].title = title;
        this.courses[index].price = price;
      }
    },
    deleteCourse(index) {
      if (confirm("Are you sure you want to delete this course?")) {
        this.courses.splice(index, 1);
      }
    },
    followUp(index) {
      alert(`Following up with ${this.leads[index].name}`);
    },
  },
};
</script>

<style scoped></style>

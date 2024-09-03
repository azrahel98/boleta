<template>
  <div class="max-w-7xl mx-auto p-4 w-full">
    <div class="grid">
      <div class="bg-white perfil rounded-lg shadow overflow-hidden">
        <div class="h-32 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        <div class="relative px-4 pb-4">
          <img
            src="../../assets/logo.png"
            class="h-28 w-28 avatar rounded-full object-contain border-4 border-lightPrimary shadow-md absolute left-[42%] -mt-12"
          />

          <div class="pt-16 font-dm">
            <h2 class="text-xl font-bold text-gray-800">{{ employee.name }}</h2>
            <p class="text-gray-600">{{ employee.position }}</p>
            <div class="flex justify-between mt-4">
              <div class="text-center">
                <span class="block text-2xl font-bold text-gray-800">{{ employee.posts }}</span>
                <span class="text-md text-gray-600">Posts</span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold text-gray-800">{{ employee.followers }}</span>
                <span class="text-md text-gray-600">Followers</span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold text-gray-800">{{ employee.following }}</span>
                <span class="text-md text-gray-600">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Your storage</h3>
        <p class="text-gray-600 mb-4">Supervise your drive space in the easiest way</p>
        <div class="bg-gray-200 rounded-full h-2 mb-2">
          <div
            class="bg-purple-600 h-2 rounded-full"
            :style="{ width: `${(employee.storageUsed / employee.storageTotal) * 100}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>{{ employee.storageUsed }} GB</span>
          <span>{{ employee.storageTotal }} GB</span>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 col-span-full">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">All projects</h3>
        <p class="text-gray-600 mb-4">
          Here you can find more details about your projects. Keep you user engaged by providing
          meaningful information.
        </p>
        <div class="space-y-4">
          <div
            v-for="project in employee.projects"
            :key="project.id"
            class="flex items-center space-x-4"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 class="font-semibold text-gray-800">{{ project.title }}</h4>
              <p class="text-sm text-gray-600">
                Project #{{ project.id }} -
                <a href="#" class="text-purple-600 hover:underline">See project details</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employee: {
        name: 'Adela Parkson',
        position: 'Product Designer',
        avatar: '../../assets/man.svg',
        posts: 17,
        followers: '9.7k',
        following: 274,
        storageUsed: 25,
        storageTotal: 50,
        generalInfo:
          'As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand. We get our heart broken by people we love, even that we give them all...',
        education: 'Stanford University',
        languages: ['English', 'Spanish', 'Italian'],
        department: 'Product Design',
        workHistory: ['Google', 'Facebook'],
        projects: [
          {
            id: 1,
            title: 'Technology behind the Blockchain',
            image: '/placeholder.svg?height=64&width=64'
          },
          {
            id: 2,
            title: 'Greatest way to a good Economy',
            image: '/placeholder.svg?height=64&width=64'
          }
        ]
      },
      notifications: [
        { id: 1, text: 'Item update notifications', enabled: true },
        { id: 2, text: 'Item comment notifications', enabled: false },
        { id: 3, text: 'Buyer review notifications', enabled: true },
        { id: 4, text: 'Rating reminders notifications', enabled: false },
        { id: 5, text: 'Meetups near you notifications', enabled: true },
        { id: 6, text: 'Company news notifications', enabled: false },
        { id: 7, text: 'New launches and projects', enabled: true }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20vh, 30vh));
  column-gap: 1vh;
  row-gap: 2vh;
  justify-content: space-between;
  grid-template-rows: 1fr;
  width: 100%;
  .perfil {
    grid-column: span 2;
  }
}
</style>

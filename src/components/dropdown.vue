<template>
  <div class="position-relative">
    <input
      type="text"
      class="form-control"
      placeholder="Search..."
      v-model="searchQuery"
      @input="debouncedSearch"
      @focus="showDropdown = true"
      @blur="hideDropdownDelayed"
    />
    <div
      v-if="showDropdown && searchResults.length > 0"
      class="position-absolute top-100 start-0 w-100 mt-1 bg-white border rounded shadow-sm"
      style="z-index: 1000"
    >
      <ul class="list-group list-group-flush">
        <li
          v-for="result in searchResults"
          :key="result.id"
          class="list-group-item list-group-item-action"
          @mousedown.prevent="selectResult(result)"
        >
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

interface SearchResult {
  id: number
  name: string
}

const searchQuery = ref('')
const searchResults = ref<SearchResult[]>([])
const showDropdown = ref(false)
let searchTimeout: number | null = null

const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(performSearch, 300)
}

const performSearch = async () => {
  if (searchQuery.value.length < 2) {
    searchResults.value = []
    return
  }

  // Mock API call
  const mockResults: SearchResult[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' },
    { id: 5, name: 'Elderberry' }
  ].filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  searchResults.value = mockResults
}

const selectResult = (result: SearchResult) => {
  searchQuery.value = result.name
  showDropdown.value = false
  // You can emit an event here if you want to notify the parent component
  // emit('select', result)
}

const hideDropdownDelayed = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>

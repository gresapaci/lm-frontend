<script setup>
import LogoLight from '@/assets/images/logos/logo-light.svg?component'
</script>

<template>
  <div class="p-4">
    <router-link to="/" class="flex items-center gap-2 text-nowrap text-[#111c2d] dark:text-white">
      <LogoLight />
      <span class="text-xl font-bold">LM Academy</span>
    </router-link>
  </div>
  <div class="scroll-sidebar" data-simplebar="">
    <nav class="w-full flex flex-col sidebar-nav px-4 mt-5">
      <ul id="sidebarnav" class="text-gray-600 text-sm">
        <li class="text-xs font-bold pb-[5px]">
          <i class="ti ti-dots nav-small-cap-icon text-lg hidden text-center"></i>
          <span class="text-xs text-gray-400 font-semibold">HOME</span>
        </li>

        <li class="sidebar-item" :class="{ selected: $route.name === 'DashboardPage' }">
          <router-link
            :to="{ name: 'DashboardPage' }"
            class="sidebar-link gap-3 py-2.5 my-1 text-base flex items-center relative rounded-md text-gray-500 w-full"
            :class="{ active: $route.name === 'DashboardPage' }"
          >
            <i class="ti ti-layout-dashboard ps-2 text-2xl"></i> <span>Dashboard</span>
          </router-link>
        </li>

        <li class="text-xs font-bold mb-4 mt-6">
          <i class="ti ti-dots nav-small-cap-icon text-lg hidden text-center"></i>
          <span class="text-xs text-gray-400 font-semibold">COURSES</span>
        </li>

        <li class="sidebar-item">
          <router-link
            :to="{ name: 'AdminCourseViewPage' }"
            class="sidebar-link gap-3 py-2.5 my-1 text-base flex items-center relative rounded-md text-gray-500 w-full"
            :class="{ active: $route.name === 'AdminCourseViewPage' }"
          >
            <i class="ti ti-book ps-2 text-2xl"></i> <span>Courses</span>
          </router-link>
        </li>

        <li class="sidebar-item">
          <router-link
            :to="{ name: 'AdminCourseStatsViewPage' }"
            class="sidebar-link gap-3 py-2.5 my-1 text-base flex items-center relative rounded-md text-gray-500 w-full"
            :class="{ active: $route.name === 'AdminCourseStatsViewPage' }"
          >
            <i class="ti ti-chart-bar ps-2 text-2xl"></i> <span>Course Stats</span>
          </router-link>
        </li>

        <li class="sidebar-item" :class="{ selected: $route.name === 'AdminScoreboardViewPage' }">
          <router-link
            :to="{ name: 'AdminScoreboardViewPage' }"
            class="sidebar-link gap-3 py-2.5 my-1 text-base flex items-center relative rounded-md text-gray-500 w-full"
            :class="{ active: $route.name === 'AdminScoreboardViewPage' }"
          >
            <i class="ti ti-trophy ps-2 text-2xl"></i> <span>Scoreboard</span>
          </router-link>
        </li>

        <li class="text-xs font-bold mb-4 mt-8">
          <i class="ti ti-dots nav-small-cap-icon text-lg hidden text-center"></i>
          <span class="text-xs text-gray-400 font-semibold">Games</span>
        </li>

        <li class="sidebar-item" :class="{ selected: $route.name === 'RandomGame' }">
          <router-link
            :to="{ name: 'RandomGame' }"
            class="sidebar-link gap-3 py-2.5 my-1 text-base flex items-center relative rounded-md text-gray-500 w-full"
            :class="{ active: $route.name === 'RandomGame' }"
          >
            <i class="ti ti-dice ps-2 text-2xl"></i> <span>Random Game</span>
          </router-link>
        </li>

        <li class="text-xs font-bold mb-4 mt-8">
          <i class="ti ti-dots nav-small-cap-icon text-lg hidden text-center"></i>
          <span class="text-xs text-gray-400 font-semibold">SUPPORT</span>
        </li>

        <li class="sidebar-item" :class="{ selected: $route.name === 'HelpPage' }">
          <router-link
            :to="{ name: 'HelpPage' }"
            class="sidebar-link gap-3 py-2.5 my-1 text-base flex items-center relative rounded-md text-gray-500 w-full"
            :class="{ active: $route.name === 'HelpPage' }"
          >
            <i class="ti ti-help ps-2 text-2xl"></i> <span>Help &amp; FAQ</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

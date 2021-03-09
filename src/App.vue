<template>
  <div id="app">
    <div id="page-top"></div>
    <div id="wrapper">
      <router-view name="sidebar"></router-view>
    
    <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column bg-dark">

      <!-- Main Content -->
        <div id="content">
          <div class="container-fluid " id="app">
            <router-view/>
          </div>    
        </div>
      </div>    
    </div>    

      <router-view name="auth"></router-view>
      <router-view name="confirmEmail"></router-view>
      <router-view name="getToken"></router-view>
  </div>
</template>


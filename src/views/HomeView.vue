<template>
    <div class="container p-4 max-w-5xl mx-auto">
        <h2 class="mt-12"><span class="font-bold text-2xl dark:text-white">Popular Movies</span> <router-link to="/popular" class="float-right text-sm font-medium block text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 px-3 py-1 rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">More</router-link></h2>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            <MovieListItem v-for="(movie, index) in moviesList" :key="index" :title="movie.title" :poster_img="image_url + movie.poster_path" :vote_avg="movie.vote_average.toFixed(1)" :year="movie.release_date.split('-')[0]" :movie_id="movie.id">
            {{ image_url + movie.poster_path }}
            </MovieListItem>
        </div>

        <h2 class="mt-12"><span class="font-bold text-2xl dark:text-white">Top Rated</span> <router-link to="/top-rated" class="float-right text-sm font-medium block text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 px-3 py-1 rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">More</router-link></h2>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            <MovieListItem v-for="(movie, index) in topRatedList" :key="index" :title="movie.title" :poster_img="image_url + movie.poster_path" :vote_avg="movie.vote_average.toFixed(1)" :year="movie.release_date.split('-')[0]" :movie_id="movie.id">
            {{ image_url + movie.poster_path }}
            </MovieListItem>
        </div>

        <h2 class="mt-12"><span class="font-bold text-2xl dark:text-white">Upcoming Movies</span> <router-link to="/upcoming" class="float-right text-sm font-medium block text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 px-3 py-1 rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">More</router-link></h2>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            <MovieListItem v-for="(movie, index) in upcomingList" :key="index" :title="movie.title" :poster_img="image_url + movie.poster_path" :vote_avg="movie.vote_average.toFixed(1)" :year="movie.release_date.split('-')[0]" :movie_id="movie.id">
            {{ image_url + movie.poster_path }}
            </MovieListItem>
        </div>
    </div>
</template>

<script>
import MovieListItem from '../components/MovieListItem.vue';
import axios from 'axios';
import { API_IMG_PATH, API_KEY } from '../config';

export default {
  components: {
    MovieListItem,
  },
  data() {
    return {
      moviesList: [],
      topRatedList: [],
      upcomingList: [],
      image_url: API_IMG_PATH
    };
  },
  methods: {
    async loadMoviesList(request_url) {
      try {
        const response = await axios.get(request_url, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
          }
        });

        return response.data.results.slice(0, 8);
      } catch (error) {
        if (error.code == 'ERR_NETWORK') {
          // Redirect to the error page
          this.$router.push('/restricted');
        } else {
          // Handle other errors
          console.error(error);
        }
        return [];
      }
    }
  },
  async mounted() {
    // POPULAR
    this.moviesList = await this.loadMoviesList('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');

    // TOP RATED
    this.topRatedList = await this.loadMoviesList('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');

    //UPCOMING
    this.upcomingList = await this.loadMoviesList('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1');
  }
};

</script>
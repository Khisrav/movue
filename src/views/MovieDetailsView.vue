<template>
    <div :style="{
        'background-image': 'url(' + movie.backdrop_path + ')',
        'background-position': 'center',
        'background-size': 'cover'
    }">
        <div class=" py-8">
            <div class="cotnainer max-w-5xl mx-auto text-slate-200">
                <div class="lg:flex">
                    <div class="flex-initial max-w-sm p-4">
                        <img :src="movie.poster_path" class="rounded-2xl shadow-2xl">
                    </div>
                    <div class="flex-auto p-4">
                        <div class="bg-slate-50 p-4 rounded-2xl shadow-2xl text-slate-800 dark:text-slate-50 dark:bg-slate-800">
                            <h1 class="font-bold text-2xl lg:text-4xl">{{ movie.title }} <span class="font-normal">({{ movie_release_year }})</span></h1>
                            <span class="font-medium mt-4 block italic">{{ movie.tagline }}</span>
                            <span class="block mt-4 mb-2 font-bold text-xl">Overview</span>
                            <p >{{ movie.overview }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-slate-900 dark:text-white container-lg">
        
    </div>
</template>

<script>
import { API_KEY, API_IMG_PATH } from '../config';
import axios from 'axios';

export default {
    data() {
        return {
            movie_id: this.$route.params.id.toString(),
            movie: {},
            movie_release_year: 0
        }
    },
    async mounted() {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/' + this.movie_id + '?language=en-US', {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + API_KEY
                }
            });

            this.movie = response.data;
            this.movie.poster_path = API_IMG_PATH + this.movie.poster_path;
            this.movie.backdrop_path = API_IMG_PATH + this.movie.backdrop_path;
            this.movie_release_year = this.movie.release_date.split('-')[0];

            console.log(this.movie);
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
}
</script>
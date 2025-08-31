<template>
    <div>
        <div class="p-5 shadow-xl ">
            <div class="flex flex-row justify-between max-w-5xl mx-auto text-xl">
                <div class="flex mt-1 space-x-3 font-serif font-semibold">
                    <div><img :src="logo" class="w-8" /></div>
                    <div>LwHa<span class="text-green-700">EE</span></div>
                </div>

                <div class="flex-row hidden gap-8 sm:flex">
                    <div>
                        <nuxt-link to="/about">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="mt-1 text-green-400 size-7">
                                <path
                                    d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path
                                    d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                        </nuxt-link>
                    </div>
                    <div>
                        <nuxt-link to="/postCreate" class="flex mt-1.5">
                            <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class=" size-6">
                                    <path
                                        d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path
                                        d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </div>
                            <div> PostCreate</div>
                        </nuxt-link>
                    </div>
                    <div>
                        <div class="relative inline-block text-xl text-left mt-1.5">
                            <div>
                                <button @click="dropdownToggle()" type="button"
                                    class="inline-flex w-full justify-center gap-x-1.5  rounded-md  text-xl  font-semibold  shadow-sm "
                                    id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="mt-2 size-4">
                                            <path fill-rule="evenodd"
                                                d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>Options</div>
                                    <svg class="w-5 h-5 mt-1 -mr-1 text-gray-400" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd"
                                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div v-show="toggle"
                                class="absolute z-10 w-56 mt-4 transition-opacity duration-1000 ease-in-out origin-top-right bg-white border-2 rounded-md shadow-lg -right-24 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <nuxt-link :to="`/profile/${userId}`"
                                        class="flex px-4 py-2 text-sm text-gray-700 hover:text-black" role="menuitem"
                                        tabindex="-1" id="menu-item-0 ">
                                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="size-6">
                                                <path fill-rule="evenodd"
                                                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div class="font-semibold"> Profile</div>
                                    </nuxt-link>
                                    <div @click="togglePassword()"
                                        class="flex px-4 py-2 text-sm text-gray-700 hover:text-black" role="menuitem"
                                        tabindex="-1" id="menu-item-1">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="size-5">
                                                <path fill-rule="evenodd"
                                                    d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div class="font-semibold">Change Password</div>
                                    </div>
                                    <button @click="signOut()" type="button"
                                        class="flex w-full px-4 py-2 text-sm text-left text-gray-700 hover:text-black"
                                        role="menuitem" tabindex="-1" id="menu-item-3">
                                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="size-6">
                                                <path
                                                    d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                                            </svg>
                                        </div>
                                        <div class="font-semibold">Sign out</div>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <img v-if="userData.image === `${url}storage/images/null`" :src="Img"
                            class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
                        <img v-else :src="userData.image"
                            class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
                    </div>

                    <div @click="saveDrop()" class="mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00C678" class="size-6">
                            <path fill-rule="evenodd"
                                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>


                    <NavbarToggleMode />
                </div>

                <div class="flex flex-row gap-5 sm:hidden">
                    <NavbarToggleMode class="mb-0.5" />
                    <div>
                        <div class="relative inline-block mt-1 text-xl text-left">
                            <div>
                                <button @click="dropdownToggle()" type="button"
                                    class="inline-flex w-full justify-center gap-x-1.5  rounded-md  text-xl  font-semibold  shadow-sm "
                                    id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="mt-2 size-4">
                                            <path fill-rule="evenodd"
                                                d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>Options</div>
                                    <svg class="w-5 h-5 mt-1 -mr-1 text-gray-400" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd"
                                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div v-show="toggle"
                                class="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <nuxt-link :to="`/profile/${userId}`"
                                        class="flex px-4 py-2 text-sm text-gray-700 hover:text-black" role="menuitem"
                                        tabindex="-1" id="menu-item-0 ">
                                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="size-6">
                                                <path fill-rule="evenodd"
                                                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div class="font-semibold"> Profile</div>
                                    </nuxt-link>
                                    <div @click="togglePassword()"
                                        class="flex px-4 py-2 text-sm text-gray-700 hover:text-black" role="menuitem"
                                        tabindex="-1" id="menu-item-1">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="size-5">
                                                <path fill-rule="evenodd"
                                                    d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div class="font-semibold">Change Password</div>
                                    </div>
                                    <button @click="signOut()" type="button"
                                        class="flex w-full px-4 py-2 text-sm text-left text-gray-700 hover:text-black"
                                        role="menuitem" tabindex="-1" id="menu-item-3">
                                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="size-6">
                                                <path
                                                    d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                                            </svg>
                                        </div>
                                        <div class="font-semibold">Sign out</div>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative mt-1">
                        <div @click="navDrop">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                            </svg>
                        </div>
                        <div v-show="navToggle"
                            class="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="p-3 py-3" role="none">
                                <div>
                                    <nuxt-link to="/about" class="flex">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="mt-1 text-green-400 size-7">
                                                <path
                                                    d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                                <path
                                                    d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                            </svg>
                                        </div>
                                        <div class="mt-1 font-semibold">Home</div>
                                    </nuxt-link>
                                </div>


                                <div @click="saveDrop()" class="flex mt-2">
                                    <div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00C678"
                                            class="size-6">
                                            <path fill-rule="evenodd"
                                                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                                clip-rule="evenodd" />
                                        </svg></div>
                                    <div class="font-semibold">Save</div>
                                </div>

                                <div>
                                    <nuxt-link to="/postCreate" class="flex mt-1.5">
                                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class=" size-6">
                                                <path
                                                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path
                                                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>
                                        </div>
                                        <div> PostCreate</div>
                                    </nuxt-link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <NavbarChangePw :togglePassword="togglePassword" :showPw="showPw" :userId="userId" />

        <div v-show="saveToggle"
            class="relative z-10 max-w-4xl mx-auto transition-opacity duration-1000 ease-in-out opacity-100"
            aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <div class="absolute right-0 z-10 w-screen">
                <div class="flex items-end justify-end h-full p-4 text-center sm:items-center sm:p-0">
                    <div :class="[
                        'relative text-left transition-all transform rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg',
                        themeStore.mode === true ? 'bg-black text-white' : 'bg-white text-black' // Conditional classes
                    ]">
                        <div class="px-4 pt-5 pb-4 mx-auto overflow-y-auto rounded-lg" style="max-height: 400px;">
                            <!-- Set max-height for scrolling -->
                            <div class="flex flex-row justify-between mb-5">
                                <div class="font-mono text-2xl font-bold">Saved Posts ... </div>
                                <div @click="saveDrop()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div v-if="postData.length > 0" class="grid grid-cols-2 mb-5">
                                <div class="p-3 scale-100 border-2 w-44 rounded-xl group hover:scale-105"
                                    v-for="(post, index) in postData" :key="index">
                                    <svg v-if="post.save !== 0" @click.stop="Save(post.id)"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="absolute opacity-0 text-zinc-800 size-6 group-hover:opacity-100">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                    <svg v-else @click.stop="UnSave(post.id)" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="#00DC82"
                                        class="absolute text-gray-500 opacity-100 size-6 ">
                                        <path fill-rule="evenodd"
                                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                    <div class="w-36">
                                        <img :src="post.images[0].image" class="w-full h-32 rounded-lg" />
                                    </div>
                                    <div class="mt-2 font-mono text-sm">
                                        <div class="truncate">{{ post.title }}</div>
                                        <div class="truncate">{{ post.genre }}</div>
                                        <div class="text-gray-500">{{ post.userName }} </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex items-center justify-center text-gray-400">No Save Post Available!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import Img from "@/assets/img/default.jpg"
import logo from "@/assets/img/social-media.png"
import { ref } from 'vue'
import changePw from './changePw.vue';
import { api, url } from "~/utils/api";
export default {
    components: { changePw },
    props: {
        getProfile: {
            type: Function,
            Required: true,
        }
    },
    setup(props) {
        const toggle = ref(false);
        const saveToggle = ref(false);
        const navToggle = ref(false);
        const showPw = ref(false);
        const userId = ref(null);
        const token = ref(null);
        const postData = ref([]);
        const userData = ref({});
        const themeStore = useThemeStore();

        const dropdownToggle = () => {
            toggle.value = !toggle.value;
        }

        const saveDrop = () => {
            saveToggle.value = !saveToggle.value;
            if (saveToggle.value == true) {
                document.body.classList.add('overflow-y-hidden'); // Prevent scrolling
            } else {
                document.body.classList.remove('overflow-y-hidden'); // Allow scrolling
            }
        }

        const navDrop = () => {
            navToggle.value = !navToggle.value;
        }

        onMounted(async () => {
            token.value = localStorage.getItem('token');
            userData.value = JSON.parse(localStorage.getItem('user'));
            userId.value = userData.value.id;
            postData.value = themeStore.save;
        });

        const Save = async (postId) => {
            const userId = Id.value;
            await api.get(`basic-ui/create/save/${postId}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token.value}` // Add the token to the headers
                }
            });
            await props.getProfile();
        }

        const UnSave = async (postId) => {
            await api.get(`basic-ui/unSave/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token.value}` // Add the token to the headers
                }
            });
            await props.getProfile();
        }

        const togglePassword = () => {
            showPw.value = !showPw.value;
        }

        const signOut = () => {
            localStorage.clear();
            themeStore.resetStore();
            navigateTo('/loginPage');
        }

        watch(() => themeStore.save, (newPosts) => {
            postData.value = newPosts;
        });

        watch(() => themeStore.user, (newPosts) => {
            userData.value = newPosts;
        });

        return {
            signOut,
            userId,
            token,
            toggle,
            dropdownToggle,
            saveDrop,
            saveToggle,
            postData,
            Save,
            UnSave,
            userData,
            togglePassword,
            showPw,
            Img,
            themeStore,
            navDrop,
            navToggle,
            logo
        }
    }

}
</script>

<style lang="stylus" scoped>

</style>

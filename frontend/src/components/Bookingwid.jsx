export default function Bookingwid({place}){
    return(
        <div class="bg-white p-6 mt-8 rounded-2xl shadow-lg max-w-md mx-auto">
        <div class="text-2xl font-bold text-center mb-6">
            Price: $<span id="price-placeholder">{place.price}</span> <span class="text-gray-500 text-lg">per night</span>
        </div>

        <div class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <label for="check-in" class="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                    <div class="relative">
                        <input type="date" id="check-in" class="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                </div>
                <div class="flex-1">
                    <label for="check-out" class="block text-sm font-medium text-gray-700 mb-1">Check out</label>
                    <div class="relative">
                        <input type="date" id="check-out" class="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                </div>
            </div>

            <div>
                <label for="max-guests" class="block text-sm font-medium text-gray-700 mb-1">Max guests</label>
                <div class="relative">
                    <input type="number" id="max-guests" min="1" class="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
        </div>

        <button class="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-xl mt-6 hover:bg-red-600 transition duration-300">
            Book Now
        </button>
    </div>
    )
}
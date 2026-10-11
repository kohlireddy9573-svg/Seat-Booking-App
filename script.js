const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 }
];


// -------------------------
// GET HTML ELEMENTS
// -------------------------

// CHANGED: Your HTML has id="selectMovie" on the <select>
const selectMovie = document.getElementById("selectMovie");

const moviePrice = document.getElementById("moviePrice");
const movieName = document.getElementById("movieName");
const totalPrice = document.getElementById("totalPrice");

const seats = document.querySelectorAll("#seatCont .seat");

const selectedSeatsHolder =
    document.getElementById("selectedSeatsHolder");

const continuebtn =
    document.getElementById("proceedBtn");

const cancelbtn =
    document.getElementById("cancelBtn");

const selectedArray = [];

let currentMoviePrice = 7;


// -------------------------
// MOVIE DROPDOWN
// -------------------------

moviesList.forEach(function (movies) {

    const option = document.createElement("option");

    option.textContent = movies.movieName;

    selectMovie.append(option);

    option.addEventListener("click", function () {

        movieName.textContent = movies.movieName;

        moviePrice.textContent = movies.price;

        currentMoviePrice = movies.price;

    });

});


// -------------------------
// SEAT SELECTION
// -------------------------

seats.forEach(function (seat) {

    if (seat.classList.contains("occupied")) {

        // Occupied seat - do nothing

    } else {

        seat.addEventListener("click", function () {

            // -------------------------
            // DESELECT SEAT
            // -------------------------

            if (seat.classList.contains("selected")) {

                seat.classList.remove("selected");

                const index = selectedArray.indexOf(seat);

                selectedArray.splice(index, 1);


                // CHANGED:
                // Remove this seat's element from
                // selectedSeatsHolder

                if (seat.selectedSeatElement) {

                    seat.selectedSeatElement.remove();

                    seat.selectedSeatElement = null;

                }

            }


            // -------------------------
            // SELECT SEAT
            // -------------------------

            else {

                seat.classList.add("selected");

                selectedArray.push(seat);


                // CHANGED:
                // Create an element for the selected seat

                const selectedSeatElement =
                    document.createElement("span");

                selectedSeatElement.textContent = "Seat";

                selectedSeatsHolder.append(selectedSeatElement);


                // CHANGED:
                // Remember which element belongs to this seat

                seat.selectedSeatElement =
                    selectedSeatElement;

            }


            // -------------------------
            // UPDATE COUNT AND PRICE
            // -------------------------

            if (selectedArray.length > 0) {

                selectedSeatsHolder
                    .querySelector(".noSelected")?.remove();

                totalPrice.textContent =
                    selectedArray.length * currentMoviePrice;

            } else {

                totalPrice.textContent = "0";


                // CHANGED:
                // Show default message when no seats
                // are selected

                const span = document.createElement("span");

                span.classList.add("noSelected");

                span.textContent = "No Seat Selected";

                selectedSeatsHolder.append(span);

            }

        });

    }

});


// -------------------------
// CONTINUE / BOOK
// -------------------------

continuebtn.addEventListener("click", function () {

    if (selectedArray.length === 0) {

        alert("Oops no seat Selected");

    } else {

        alert("Yayy! Your Seats have been booked");


        selectedArray.forEach(function (seat) {

            seat.classList.remove("selected");

            seat.classList.add("occupied");


            // CHANGED:
            // Remove the small selected-seat display

            if (seat.selectedSeatElement) {

                seat.selectedSeatElement.remove();

                seat.selectedSeatElement = null;

            }

        });


        totalPrice.textContent = "0";


        // CHANGED:
        // Reset selected seat holder

        selectedSeatsHolder.textContent = "";

        const span = document.createElement("span");

        span.classList.add("noSelected");

        span.textContent = "No Seat Selected";

        selectedSeatsHolder.append(span);


        // Clear selectedArray

        selectedArray.splice(0, selectedArray.length);

    }

});


// -------------------------
// CANCEL
// -------------------------

cancelbtn.addEventListener("click", function () {

    selectedArray.forEach(function (seat) {

        seat.classList.remove("selected");


        // CHANGED:
        // Remove selected-seat display

        if (seat.selectedSeatElement) {

            seat.selectedSeatElement.remove();

            seat.selectedSeatElement = null;

        }

    });


    totalPrice.textContent = "0";


    // Reset selected seat holder

    selectedSeatsHolder.textContent = "";

    const span = document.createElement("span");

    span.classList.add("noSelected");

    span.textContent = "No Seat Selected";

    selectedSeatsHolder.append(span);


    // Clear array

    selectedArray.splice(0, selectedArray.length);

});
import NotFoundPage from "../Pages/NotFoundPage";
import BookingsPage from "../Pages/BookingsPage";
import RoomsPage from "../Pages/RoomsPage";

export const routes= {
  ROOMS:{
    path: "/rooms",
    label:"Habitaciones",
    element: RoomsPage,
  },
  RESERVATIONS:{
    path: "/bookings",
    label:"Reservaciones",
    element: BookingsPage,
  },
  
  NOT_FOUND:{
    path: "*",
    label: "Error 404",
    element: NotFoundPage,
    isPrivate: false,
    headerTestId: ""
  }
};
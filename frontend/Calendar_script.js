//CREDITS TO https://fullcalendar.io/ FOR THE CALENDAR SCRIPT

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    select: function (info) {
      openAddEventPopup(info);
    },
    eventAdd: function (info) {
      console.log(info.event);
      closeAddEventPopup();
    },
    eventClick: function (info) {
      if (confirm("Are you sure you want to delete this event?")) {
        info.event.remove();
      }
    },
  });
  calendar.render();

  var addEventPopup = document.getElementById("addEventPopup");
  var closePopupButton = document.getElementById("closePopupButton");

  function openAddEventPopup(info) {
    addEventPopup.style.display = "block";
    closePopupButton.onclick = function () {
      closeAddEventPopup();
    };

    var form = document.getElementById("addEventForm");
    form.onsubmit = function (event) {
      event.preventDefault();
      var titleInput = document.getElementById("eventTitle");
      var title = titleInput.value;
      if (title) {
        calendar.addEvent({
          title: title,
          start: info.startStr,
          end: info.endStr,
          allDay: info.allDay,
        });
      }
      form.reset();
    };
  }

  function closeAddEventPopup() {
    addEventPopup.style.display = "none";
  }
});

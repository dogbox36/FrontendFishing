export interface Event {
    title: string;
    start: string | Date;
    end?: string | Date;
    groupId?: string;
  }
  
  function getDate(dayString: string): string {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
  
    if (month.length === 1) {
      month = "0" + month;
    }
  
    return dayString.replace("YEAR", year).replace("MONTH", month);
  }
  
  const events: Event[] = [
    { title: "All Day Event", start: getDate("YEAR-MONTH-01") },
    {
      title: "Harcsa fogási tilalom",
      start: getDate("YEAR-MONTH-07"),
      end: getDate("YEAR-MONTH-12")
    },
  
  ];
  
  export default events;
  
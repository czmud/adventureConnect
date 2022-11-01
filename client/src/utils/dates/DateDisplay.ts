export default function dateDisplay(date: string){

    date = date.slice(0,19);
    
    const MM: Array<string> = ["January", "February","March","April","May","June","July","August","September","October","November", "December"]
    const year: string = date.slice(0, 4);
    const  month: string = date.slice(5, 7);
    const day: string = date.slice(8, 10);

    let hour: string = String(parseInt(date.slice(11,13)));
    if (parseInt(hour) < 10){ hour = "0"+hour }

    let min: string = String(parseInt(date.slice(14, 17)));
    if (parseInt(min) < 10){ min = "0"+min }
    
    const a_p: string = parseInt(hour) < 12 ? 'AM' : 'PM'
    
    return ''+MM[parseInt(month)-1]+' '+day+', '+year+' '+hour+':'+min+' '+a_p;
    
    }
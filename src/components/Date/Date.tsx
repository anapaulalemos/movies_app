import { parseISO, format } from 'date-fns';

interface DateProps {
    dateString: string;
    dateFormat?: string;
}

const Date = ({
    dateString,
    dateFormat = 'LLLL d, yyyy'
}: DateProps) => {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, dateFormat)}</time>
}

export default Date;
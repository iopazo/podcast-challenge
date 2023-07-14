const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  interface FormattedDateProps {
    date: Date,
    className?: string,
  }
  
  export function FormattedDate({ date, ...props } : FormattedDateProps) {
    return (
      <time dateTime={date.toISOString()} {...props}>
        {dateFormatter.format(date)}
      </time>
    )
  }
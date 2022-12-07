function Alert({ bgColor }: { bgColor?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8227 3.48644L21.8727 19.5405C21.9561 19.6884 22 19.8562 22 20.027C22 20.1978 21.9561 20.3656 21.8727 20.5135C21.7893 20.6614 21.6694 20.7842 21.525 20.8696C21.3806 20.955 21.2168 21 21.05 21H2.95001C2.78324 21 2.61942 20.955 2.475 20.8696C2.33058 20.7842 2.21065 20.6614 2.12727 20.5135C2.04389 20.3656 2 20.1978 2 20.027C2 19.8562 2.0439 19.6884 2.12728 19.5405L11.1773 3.48644C11.2607 3.33855 11.3806 3.21573 11.525 3.13034C11.6694 3.04495 11.8332 3 12 3C12.1668 3 12.3306 3.04495 12.475 3.13034C12.6194 3.21573 12.7393 3.33855 12.8227 3.48644V3.48644ZM4.59546 19.054H19.4045L12 5.91888L4.59546 19.054V19.054ZM11.05 16.1351H12.95V18.0811H11.05V16.1351ZM11.05 9.3243H12.95V14.1892H11.05V9.3243Z"
        fill={bgColor ? bgColor : '#F5F5F5'}
      />
    </svg>
  );
}

export default Alert;

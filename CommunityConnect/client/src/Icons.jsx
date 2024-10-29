export const EditPencil = ({ color, size }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="false"
      aria-labelledby="ltclid25_title "
    >
      <title id="ltclid25_title">Edit</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 14V11.7071L9.5 4.20708L11.7929 6.49998L4.29289 14H2ZM12.5 5.79287L13.7929 4.49998L11.5 2.20708L10.2071 3.49998L12.5 5.79287ZM11.1464 1.14642L1.14645 11.1464L1 11.5V14.5L1.5 15H4.5L4.85355 14.8535L14.8536 4.85353V4.14642L11.8536 1.14642H11.1464Z"
        fill={color ?? "currentColor"}
      ></path>
    </svg>
  );
  
  export const RightChevron = ({ color, size }) => (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
  
  export const TrashcanDelete = ({ color, size }) => (
    <div style={{ padding: '3px'}}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      display="block"
      enableBackground="new 0 0 24 24"
      padding="5px"
    >
      <path
        fill="none"
        stroke={color ?? "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 2.5v-2h4v2M1 2.5h14M9.533 13.5l.25-9M6.217 4.5l.25 9M2.661 4.5l.889 11h8.9l.888-11"
      ></path>
    </svg>
    </div>
  );
  
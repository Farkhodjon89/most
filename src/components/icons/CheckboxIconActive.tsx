const CheckboxIconActive = ({ size = 16 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" rx="4" fill="#5656FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L7.5 11.9142L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L7.5 9.08579L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
        fill="#F5F5F7"
      />
    </svg>
  );
};

export default CheckboxIconActive;

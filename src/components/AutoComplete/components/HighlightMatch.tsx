type Props = {
  text: string;
  query: string;
};
const HighlightMatch: React.FC<Props> = ({ text, query }) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} style={{ fontWeight: "bold" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default HighlightMatch;

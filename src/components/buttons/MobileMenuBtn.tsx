import HamburgerIcon from "../shared/icons/HamburgerIcon";

const MobileMenuBtn = ({ onClick, modifyClasses = "" }) => {
  return (
    <button
      aria-label="Open Mobile Navigation"
      className={`block ${modifyClasses}`}
      onClick={onClick}
    >
      <HamburgerIcon />
    </button>
  );
};

export default MobileMenuBtn;

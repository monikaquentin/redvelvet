const Footer = () => {
  return (
    <div className="footer-wrapper">
      <hr />
      <h2>
        &copy; {new Date().getFullYear()}&nbsp;|&nbsp;
        <a href="mailto:re@redvelvet.me">redvelvet</a>
      </h2>
    </div>
  )
}

export default Footer

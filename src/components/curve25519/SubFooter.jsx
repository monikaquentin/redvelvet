import redvelvet_curve25519_public_key from '@/assets/png/redvelvet-curve25519-public-key.png'

function SubFooter() {
  return (
    <div className="sub-footer">
      <label className="!mt-0">
        <a href="https://www.desmos.com/calculator/4chrbl0xau" target="_blank" rel="noopener noreferrer nofollow">
          y&#178; = x&#xB3; + 486662x&#178; + x
        </a>
      </label>
      <div className="qr-code-curve25519-public">
        <img
          src={redvelvet_curve25519_public_key}
          title="RedVelvet Curve25519 Public Key"
          alt="redvelvet-curve25519-public-key"
        />
      </div>
    </div>
  )
}

export default SubFooter

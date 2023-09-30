import ed25519 from '@/components/default/key/ed25519'
import curve25519 from '@/components/default/key/curve25519'
import secp256k1 from '@/components/default/key/secp256k1'
import descriptions from '@/components/default/key/descriptions'

import { Link } from 'react-router-dom'

function PublicKeys() {
  return (
    <div>
      <h4 className="text-sm font-bold mb-2 mt-2">ECC_EDDSA_ED25519 [SCA]-primary</h4>
      <pre className="pre">{ed25519}</pre>

      <h4 className="text-sm font-bold mb-2 mt-2">
        <Link to="curve25519">ECDH_CURVE25519</Link> [E]
      </h4>
      <pre className="pre">{curve25519}</pre>

      <h4 className="text-sm font-bold mb-2 mt-2">ECC_SECG_P256K1 [SE]-secondary</h4>
      <pre className="pre">{secp256k1}</pre>
      <pre className="pre">{descriptions}</pre>
    </div>
  )
}

export default PublicKeys

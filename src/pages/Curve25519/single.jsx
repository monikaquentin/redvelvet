import PropTypes from 'prop-types'

import { ec as EC } from 'elliptic'

import Aes256GCM from '@/functions/AES256'
import Container from '@/components/global/Container'
import Input from '@/components/global/Input'
import TextArea from '@/components/global/TextArea'
import SubFooter from '@/components/curve25519/SubFooter'

import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { hexDump, hexToUint8Array } from '@/functions/Hexadecimal'

const Curve25519Single = ({ t }) => {
  const curve25519 = new EC('curve25519')
  const regexKey = /^(?:[0-9a-fA-F]{62}|[0-9a-fA-F]{64})$/
  const [state, setState] = useState({
    errorMessage: '',
    privateKey: '',
    publicKey: '',
    keyDisabled: false,
    keyLocked: false,
    plainTextMessage: '',
    dumpEncryptedMessage: '',
    dumpCopied: false,
    x1PublicKey: ''
  })

  const keyLockedValidation = (next) => {
    if (!next.x1PublicKey || !next.x1PublicKey.match(regexKey)) return false
    if (next.x1PublicKey === next.privateKey || next.x1PublicKey === next.publicKey) return false
    return true
  }

  const sharedKey = useMemo(() => {
    let next = { ...state }

    const userSecret = curve25519.keyFromPrivate(next.privateKey)

    if (keyLockedValidation(next))
      try {
        return userSecret.derive(curve25519.keyFromPublic(hexToUint8Array(next.x1PublicKey)).getPublic()).toString(16)
      } catch (error) {
        return false
      }
    return false
  }, [state.privateKey, state.x1PublicKey, state.keyLocked])

  useEffect(() => {
    if (state.plainTextMessage && sharedKey && state.keyLocked) {
      Aes256GCM.encrypt(state.plainTextMessage, sharedKey).then((cipher) => {
        setState((prevState) => ({
          ...prevState,
          dumpEncryptedMessage: hexDump(cipher) || t('pages.curve25519.error_messages.bad_key_exchange')
        }))
      })
    }
  }, [state.privateKey, state.x1PublicKey, state.plainTextMessage, sharedKey, state.keyLocked])

  const deriveHandle = () => {
    let next = { ...state }

    if (!next.privateKey || !next.privateKey.match(regexKey)) {
      next.errorMessage = t('pages.curve25519.error_messages.hex_key_format')
      return setState(next)
    }

    next.errorMessage = ''
    next.x1PublicKey = ''
    next.keyDisabled = !next.keyDisabled
    next.publicKey = curve25519.keyFromPrivate(next.privateKey).getPublic('hex')

    setState(next)
  }

  const lockHandle = () => {
    let next = { ...state }

    next.errorMessage = ''

    if (!keyLockedValidation(next) || !sharedKey) {
      next.errorMessage = t('pages.curve25519.error_messages.key_x1_duplicated')
      return setState(next)
    } else {
      next.keyLocked = !next.keyLocked
    }

    setState(next)
  }

  const privateKeyInput_attr = {
    id: 'private_key_input',
    label: t('pages.curve25519.other.label.private_key_input'),
    type: 'text',
    name: 'private_key_input',
    placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
    disabled: state.keyDisabled,
    value: state.privateKey,
    autoComplete: 'private_key_input',
    onChange: (event) => setState({ ...state, errorMessage: '', privateKey: event.target.value })
  }

  const publicKeyInput_attr = {
    id: 'public_key_input',
    label: t('pages.curve25519.other.label.public_key_input'),
    type: 'text',
    name: 'public_key_input',
    placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
    disabled: true,
    value: state.publicKey,
    autoComplete: 'public_key_input'
  }

  const sharedKeyInput_attr = {
    id: 'shared_key_input',
    label: t('pages.curve25519.other.label.shared_key_input'),
    type: 'text',
    name: 'shared_key_input',
    placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
    disabled: true,
    value: sharedKey || '???',
    autoComplete: 'shared_key_input'
  }

  const plainTextMessageTextArea_attr = {
    id: 'plaintext_message_text_area',
    label: t('pages.curve25519.other.label.plaintext_message_text_area'),
    description: t('pages.curve25519.other.description.plaintext_message_text_area'),
    htmlFor: 'plaintext_message_text_area',
    name: 'plaintext_message_text_area',
    rows: 3,
    placeholder: t('pages.curve25519.other.placeholder.plaintext_message_text_area'),
    disabled: false,
    value: state.plainTextMessage,
    onChange: (event) => {
      setState({ ...state, errorMessage: '', plainTextMessage: event.target.value, dumpCopied: false })
    }
  }

  const keyElements = (
    <Input
      attr={{
        id: 'x1_public_key',
        label: t('pages.curve25519.other.label.x1_public_key'),
        type: 'text',
        name: 'x1_public_key',
        placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
        disabled: state.keyLocked,
        value: state.x1PublicKey,
        autoComplete: 'x1_public_key',
        onChange: (event) => setState({ ...state, errorMessage: '', x1PublicKey: event.target.value })
      }}
    />
  )

  return (
    <Container header={{ title: 'Curve25519 | AES-256-GCM', subtitle: t('pages.curve25519.single.subtitle') }}>
      <div className="page-curve25519-wrapper">
        <hr />
        <p className="warning-paragraph mt-4">
          {t('pages.curve25519.single.description')}&nbsp;
          <span>
            {t('pages.curve25519.other.supports')}&nbsp;
            <Link title="Write" to="/curve25519-multiple">
              {t('pages.curve25519.other.link.to_multiple')}
            </Link>
            .
          </span>
        </p>
        <Input attr={privateKeyInput_attr} />
        {state.keyDisabled && <Input attr={publicKeyInput_attr} />}
        {!state.keyDisabled ? (
          <div className="flex mt-1">
            <button type="submit" className="default-button" onClick={deriveHandle}>
              {t('pages.curve25519.other.button.derive')}
            </button>
            {state.errorMessage ? (
              <p className="error-paragraph">{state.errorMessage}</p>
            ) : (
              <p className="button-paragraph">
                {t('pages.curve25519.other.link.button.p')}&nbsp;
                <Link to="/curve25519-decrypt">{t('pages.curve25519.other.link.button.decrypt')}</Link>?
              </p>
            )}
          </div>
        ) : (
          <div>
            {keyElements}
            <Input attr={sharedKeyInput_attr} />
            <div className="flex mt-1">
              {!state.keyLocked && (
                <div>
                  <button type="button" className="default-button" onClick={lockHandle}>
                    {t('pages.curve25519.other.button.lock_and_derive')}
                  </button>
                </div>
              )}
              {state.keyLocked && !state.errorMessage && (
                <button type="button" className="default-button mt-1" onClick={lockHandle}>
                  {t('pages.curve25519.other.button.unlock')}
                </button>
              )}
              {state.errorMessage && <p className="error-paragraph">{state.errorMessage}</p>}
            </div>
            {state.keyLocked && <TextArea attr={plainTextMessageTextArea_attr} />}
            {state.plainTextMessage && state.keyLocked && (
              <div className="encrypt-result-wrapper">
                <label>{t('pages.curve25519.other.label.disrupted_message')}:</label>
                <pre>{state.dumpEncryptedMessage}</pre>
                <div className="copy-wrapper">
                  <div className="content">
                    {!state.dumpCopied ? (
                      <CopyToClipboard
                        text={state.dumpEncryptedMessage}
                        onCopy={() => setState({ ...state, dumpCopied: !state.dumpCopied })}
                      >
                        <button className="default-button">{t('pages.curve25519.other.copy')}</button>
                      </CopyToClipboard>
                    ) : (
                      <p>{t('pages.curve25519.other.copy_success')}</p>
                    )}
                  </div>
                  <p className="button-paragraph">
                    {t('pages.curve25519.other.link.button.p')}&nbsp;
                    <Link to="/curve25519-decrypt">{t('pages.curve25519.other.link.button.decrypt')}</Link>?
                  </p>
                </div>
                <p className="info-paragraph">{t('pages.curve25519.single.info')}</p>
              </div>
            )}
          </div>
        )}
        <SubFooter />
      </div>
    </Container>
  )
}

Curve25519Single.propTypes = {
  t: PropTypes.func
}

export default Curve25519Single

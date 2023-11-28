import PropTypes from 'prop-types'

import Aes256GCM from '@/functions/AES256'
import Container from '@/components/global/Container'
import Input from '@/components/global/Input'
import TextArea from '@/components/global/TextArea'
import SubFooter from '@/components/curve25519/SubFooter'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { reverseHexDump } from '@/functions/Hexadecimal'

const Curve25519Decrypt = ({ t }) => {
  const regexKey = /^(?:[0-9a-fA-F]{62}|[0-9a-fA-F]{64})$/
  const regexHex = /^[0-9A-Fa-f]+$/

  const [state, setState] = useState({
    errorMessage: '',
    sharedKey: '',
    keyLocked: false,
    cipherTextMessage: '',
    plainTextMessage: ''
  })

  useEffect(() => {
    if (state.cipherTextMessage && state.keyLocked) {
      try {
        const message =
          !state.cipherTextMessage.match(regexKey) && state.cipherTextMessage.match(regexHex)
            ? state.cipherTextMessage
            : reverseHexDump(state.cipherTextMessage)
        Aes256GCM.decrypt(message, state.sharedKey).then((plainText) => {
          if (plainText) return setState((prevState) => ({ ...prevState, plainTextMessage: plainText }))
          setState((prevState) => ({ ...prevState, plainTextMessage: '' }))
        })
      } catch (error) {
        setState((prevState) => ({ ...prevState, plainTextMessage: '' }))
      }
    }
    setState((prevState) => ({ ...prevState, plainTextMessage: '' }))
  }, [state.sharedKey, state.cipherTextMessage, state.keyLocked])

  const lockHandle = () => {
    let next = { ...state }

    if (!next.sharedKey.match(regexKey)) {
      next.errorMessage = t('pages.curve25519.error_messages.hex_key_format')
    } else {
      next.errorMessage = ''
      next.keyLocked = !next.keyLocked
    }

    setState(next)
  }

  const sharedKeyInput_attr = {
    id: 'shared_key_input',
    label: t('pages.curve25519.other.label.shared_key_input'),
    type: 'text',
    name: 'shared_key_input',
    placeholder: t('pages.curve25519.other.placeholder.hex_placeholder'),
    disabled: state.keyLocked,
    value: state.sharedKey,
    autoComplete: 'shared_key_input',
    onChange: (event) => setState({ ...state, errorMessage: '', sharedKey: event.target.value })
  }

  const placeholderCipherTextMessage = `0000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00   ................
0010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00   ................
0020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00   ................
0030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00   ................`

  const cipherTextMessageTextArea_attr = {
    id: 'ciphertext_message_text_area',
    label: t('pages.curve25519.other.label.ciphertext_message_text_area'),
    description: t('pages.curve25519.other.label.ciphertext_message_text_area'),
    htmlFor: 'ciphertext_message_text_area',
    name: 'ciphertext_message_text_area',
    rows: 4,
    placeholder: placeholderCipherTextMessage,
    disabled: false,
    value: state.cipherTextMessage,
    onChange: (event) => {
      setState({ ...state, errorMessage: '', cipherTextMessage: event.target.value })
    }
  }

  return (
    <Container header={{ title: 'Curve25519 | AES-256-GCM', subtitle: t('pages.curve25519.decrypt.subtitle') }}>
      <div className="page-curve25519-wrapper">
        <hr />
        <p className="warning-paragraph mt-4">{t('pages.curve25519.decrypt.description')}</p>
        <Input attr={sharedKeyInput_attr} />
        {!state.keyLocked ? (
          <div className="flex mt-1">
            <button type="submit" className="default-button" onClick={lockHandle}>
              {t('pages.curve25519.other.button.lock')}
            </button>
            {state.errorMessage ? (
              <p className="error-paragraph">{state.errorMessage}</p>
            ) : (
              <p className="button-paragraph">
                {t('pages.curve25519.other.link.button.p')}&nbsp;
                <Link to="/curve25519">{t('pages.curve25519.other.link.button.encrypt')}</Link>?
              </p>
            )}
          </div>
        ) : (
          <div>
            <TextArea attr={cipherTextMessageTextArea_attr} />
            {state.keyLocked && state.cipherTextMessage && (
              <div className="encrypt-result-wrapper">
                <label>{t('pages.curve25519.other.label.decrypted_message')}:</label>
                <p className="paragraph mt-2">{state.plainTextMessage || '???'}</p>
              </div>
            )}
            <p className="button-paragraph !ml-0">
              {t('pages.curve25519.other.link.button.p')}&nbsp;
              <Link to="/curve25519">{t('pages.curve25519.other.link.button.encrypt')}</Link>?
            </p>
          </div>
        )}
        <SubFooter />
      </div>
    </Container>
  )
}

Curve25519Decrypt.propTypes = {
  t: PropTypes.func
}

export default Curve25519Decrypt

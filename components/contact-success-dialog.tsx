"use client"

import { useEffect, useId, useRef } from "react"
import styles from "./contact-success-dialog.module.css"

type ContactSuccessDialogProps = {
  open: boolean
  description: string
  onClose: () => void
}

export function ContactSuccessDialog({ open, description, onClose }: ContactSuccessDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!open) {
      if (dialog.open) dialog.close()
      return
    }

    if (!dialog.open) dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    titleRef.current?.focus({ preventScroll: true })

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault()
          dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus()
        }
      }}
    >
      <p className={styles.eyebrow}>CONTACT / RECEIVED</p>
      <h2 ref={titleRef} id={titleId} tabIndex={-1} className={styles.title}>
        お問い合わせを受け付けました。
      </h2>
      <p id={descriptionId} className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()}>
          閉じる
        </button>
      </div>
    </dialog>
  )
}

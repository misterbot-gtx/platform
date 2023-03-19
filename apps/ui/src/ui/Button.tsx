import { forwardRef, PropsWithChildren, Ref } from 'react'
import clsx from 'clsx'
import { Link, To } from 'react-router-dom'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'plain'
export type ButtonSize = 'tiny' | 'small' | 'regular'

type BaseButtonProps = PropsWithChildren<{
    children?: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: React.ReactNode
    isLoading?: boolean
}> & JSX.IntrinsicElements['button']

type ButtonProps = {
    onClick?: () => void
    type?: 'button' | 'submit'
} & BaseButtonProps

type LinkButtonProps = {
    to: To
} & BaseButtonProps

const LinkButton = forwardRef(function LinkButton(props: LinkButtonProps, ref: Ref<HTMLAnchorElement> | undefined) {
    return (
        <Link to={props.to} className={
            `ui-button ${props.variant ?? 'primary'} ${props.size ?? 'regular'}`
        } ref={ref}>
            {props.icon && (<span className="button-icon">{props.icon}</span>)}
            {props.children}
        </Link>
    )
})

export { LinkButton }

const Button = forwardRef(function Button(props: ButtonProps, ref: Ref<HTMLButtonElement> | undefined) {
    const {
        onClick,
        type = 'button',
        variant = 'primary',
        size = 'regular',
        icon,
        children,
        isLoading = false,
        disabled,
        style,
        ...rest
    } = props
    return (
        <button
            onClick={onClick}
            type={type}
            className={clsx(
                'ui-button',
                variant,
                size,
                { 'is-loading': isLoading },
                { 'ui-button-no-children': children == null },
            )}
            ref={ref}
            disabled={disabled ?? isLoading}
            style={style}
            {...rest}
        >
            {icon && (<span className="button-icon">{icon}</span>)}
            {children}
        </button>
    )
})

export default Button

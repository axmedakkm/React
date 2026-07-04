import { useState } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi"
import { axiosRequest } from "../lib/axiosRequest"
import { setToken } from "../lib/token"

export default function Login() {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        const email = e.target.email.value.trim()
        const password = e.target.password.value

        if (!email || !password) {
            setError(t("login.errors.fillFields"))
            setIsLoading(false)
            return
        }

        try {
            let response = await axiosRequest.post("auth/login" , {
                email,
                password,
            })

            if(!response.data.token){
                setError(t("login.errors.noToken"))
                setIsLoading(false)
                return navigate("/login")
            }

            setToken(response.data.token)
            setIsLoading(false)
            navigate("/")
        } catch (error) {
            console.error(error)
            const errorMsg = error.response?.data?.message || t("login.errors.invalidCredentials")
            setError(errorMsg)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-slate-100 via-blue-50 to-indigo-100 p-4 font-sans">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-indigo-100 hover:shadow-2xl">
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4 animate-pulse">
                        <FiLock className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t("login.welcome")}</h2>
                    <p className="text-slate-500 text-sm mt-1">{t("login.subtitle")}</p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 text-sm flex items-center gap-3">
                        <FiAlertCircle className="text-rose-500 text-lg shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 block" htmlFor="email">
                            {t("login.emailLabel")}
                        </label>
                        <div className="relative group">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <FiMail className="text-lg" />
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="example@mail.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-slate-700 block" htmlFor="password">
                                {t("login.passwordLabel")}
                            </label>
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                {t("login.forgotPassword")}
                            </a>
                        </div>
                        <div className="relative group">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <FiLock className="text-lg" />
                            </span>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me checkbox */}
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                            {t("login.rememberMe")}
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t("login.submitting")}
                            </>
                        ) : (
                            t("login.submit")
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center text-sm text-slate-500">
                    {t("login.noAccount")}{" "}
                    <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        {t("login.createAccount")}
                    </a>
                </div>
            </div>
        </div>
    )
}


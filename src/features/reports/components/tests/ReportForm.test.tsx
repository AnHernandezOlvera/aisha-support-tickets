import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import ReportForm from "../ReportForm"

describe("ReportForm", () => {
  it("shows validation errors when submitting empty form", async () => {
    const { container } = render(<ReportForm />)

    const form = container.querySelector("form")!
    fireEvent.submit(form)

    expect(await screen.findByText(/el asunto es obligatorio/i)).toBeInTheDocument()
    expect(await screen.findByText(/la prioridad es obligatoria/i)).toBeInTheDocument()
  })

  it("enables submit button when required fields are filled", async () => {
    render(<ReportForm />)

    await userEvent.type(screen.getByLabelText(/asunto/i), "Problema con login")

    const prioritySelect = screen.getByRole("combobox", { name: /prioridad/i })
    await userEvent.click(prioritySelect)
    await userEvent.click(screen.getByRole("option", { name: /alta/i }))

    const submitButton = await screen.findByText(/enviar reporte/i)
    expect(submitButton).not.toBeDisabled()
  })
})

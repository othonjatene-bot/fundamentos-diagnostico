exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let sintese, answers;
  try {
    const body = JSON.parse(event.body || "{}");
    sintese = body.sintese;
    answers = body.answers;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid body" }) };
  }

  const linhas = (arr) => (arr || []).map((v, i) => `<li>${i + 1}. ${v}</li>`).join("");

  const html = `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#1A1814;">
  <div style="border-bottom:2px solid #8B6F4E;padding-bottom:16px;margin-bottom:24px;">
    <p style="font-size:11px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#8B6F4E;margin:0 0 6px;">Método Fundamentos</p>
    <h1 style="font-size:22px;font-weight:300;margin:0;">Diagnóstico Inicial — Novo Cliente</h1>
  </div>
  ${sintese ? `
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr><td style="padding:14px 16px;border:1px solid #e8e4dc;background:#fff;">
      <p style="font-size:10px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#C4A882;margin:0 0 5px;">Perfil da empresa</p>
      <p style="font-size:14px;line-height:1.7;margin:0;">${sintese.perfil_empresa || ""}</p>
    </td></tr>
    <tr><td style="padding:14px 16px;border:1px solid #e8e4dc;border-top:none;background:#faf8f4;">
      <p style="font-size:10px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#C4A882;margin:0 0 5px;">Momento atual</p>
      <p style="font-size:14px;line-height:1.7;margin:0;">${sintese.momento_atual || ""}</p>
    </td></tr>
    <tr><td style="padding:14px 16px;border:1px solid #e8e4dc;border-top:none;background:#fff;">
      <p style="font-size:10px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#C4A882;margin:0 0 8px;">Três dores prioritárias</p>
      <ul style="font-size:14px;line-height:1.8;margin:0;padding-left:18px;">${linhas(sintese.tres_dores_prioritarias)}</ul>
    </td></tr>
    <tr><td style="padding:14px 16px;border:1px solid #e8e4dc;border-top:none;background:#faf8f4;">
      <p style="font-size:10px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#C4A882;margin:0 0 5px;">Premissa dominante</p>
      <p style="font-size:14px;line-height:1.7;margin:0;">${sintese.premissa_dominante || ""}</p>
    </td></tr>
    <tr><td style="padding:14px 16px;border:1px solid #e8e4dc;border-top:none;background:#fff;">
      <p style="font-size:10px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#C4A882;margin:0 0 5px;">Hipótese de causa raiz</p>
      <p style="font-size:14px;line-height:1.7;margin:0;">${sintese.hipotese_de_causa || ""}</p>
    </td></tr>
    <tr><td style="padding:14px 16px;border:1px solid #e8e4dc;border-top:none;background:#faf8f4;">
      <p style="font-size:10px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#C4A882;margin:0 0 5px;">Módulo inicial sugerido</p>
      <p style="font-size:14px;line-height:1.7;margin:0;">${sintese.modulo_sugerido || ""}</p>
    </td></tr>
    <tr><td style="padding:14px 16px;border:1px solid #e8e4dc;border-top:none;background:#fff;">
      <p style="font-size:10px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#C4A882;margin:0 0 8px;">Alertas para o mentor</p>
      <ul style="font-size:14px;line-height:1.8;margin:0;padding-left:18px;">${linhas(sintese.alertas_para_o_mentor)}</ul>
    </td></tr>
  </table>
  ` : `<p>Respostas registradas:</p><pre style="background:#faf8f4;padding:16px;font-size:13px;white-space:pre-wrap;">${JSON.stringify(answers, null, 2)}</pre>`}
  <p style="font-size:11px;color:#C4A882;margin-top:24px;border-top:1px solid #e8e4dc;padding-top:12px;">
    Método Fundamentos — Diagnóstico gerado automaticamente antes da sessão de onboarding.
  </p>
</div>`;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Fundamentos <onboarding@resend.dev>",
      to: ["othonjatene@gmail.com"],
      subject: "Novo diagnóstico — cliente concluiu o Módulo 0",
      html,
    }),
  });

  const resendData = await resendRes.json();
  console.log("Resend response:", JSON.stringify(resendData));

  if (!resendRes.ok) {
    return { statusCode: 500, body: JSON.stringify({ error: resendData }) };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};

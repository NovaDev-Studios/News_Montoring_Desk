from flask import Blueprint, jsonify
import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import datetime
import os

report = Blueprint('report', __name__, url_prefix='/report')

@report.route('/generate', methods=['GET'])
def generate_report_route():
    # Sample article data — replace with actual news or DB data
    articles = [
        {"title": "Bitcoin hits new high", "source": "BBC"},
        {"title": "Ethereum upgrade released", "source": "CNN"}
    ]

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

    # Save CSV report
    csv_path = f"report_{timestamp}.csv"
    df = pd.DataFrame(articles)
    df.to_csv(csv_path, index=False)

    # Save PDF report
    pdf_path = f"report_{timestamp}.pdf"
    c = canvas.Canvas(pdf_path, pagesize=letter)
    c.setFont("Helvetica", 12)
    c.drawString(100, 750, "News Report")
    y = 720
    for article in articles:
        c.drawString(100, y, f"{article['source']}: {article['title']}")
        y -= 20
    c.save()

    return jsonify({
        "message": "Report generated successfully",
        "csv": csv_path,
        "pdf": pdf_path
    })

from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, current_user
from .models import User

admin = Blueprint('admin', __name__)

@admin.route('/admin')
@login_required
def admin_panel():
    if current_user.role != 'Admin':
        return redirect(url_for('main.dashboard'))
    users = User.query.all()  # Fetch all users for the admin panel
    return render_template('admin_panel.html', users=users)

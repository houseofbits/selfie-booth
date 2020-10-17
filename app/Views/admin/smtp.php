<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<div class="card-header p-2 font-weight-bolder">
    Send image to email
    <button type="submit" class="btn btn-primary float-right">Save</button>
</div>
<div class="container p-3">
    <div class="form-group form-check mb-0">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">On/Off</label>
    </div>
</div>
<div class="card-header p-2 font-weight-bolder">Email content</div>
<div class="container p-3">

    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home">LV</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu1">EN</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu2">RU</a>
        </li>
    </ul>

    <div class="tab-content mt-3">
        <div class="tab-pane container active" id="home">
            <div class="form-group">
                <textarea class="form-control" rows="5" id="comment"></textarea>
            </div>
        </div>
        <div class="tab-pane container fade" id="menu1">
            <div class="form-group">
                <textarea class="form-control" rows="5" id="comment"></textarea>
            </div>
        </div>
        <div class="tab-pane container fade" id="menu2">
            <div class="form-group">
                <textarea class="form-control" rows="5" id="comment"></textarea>
            </div>
        </div>
    </div>


</div>

<div class="card-header p-2 font-weight-bolder">SMTP Server connection settings</div>
<div class="container p-3">
    <form action="/admin/smtp">
        <div class="form-group">
            <label for="uname">Host:</label>
            <input type="text" class="form-control" id="uname" placeholder="Host" name="uname" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <form action="/admin/smtp">
            <div class="form-group">
                <label for="uname">Username:</label>
                <input type="text" class="form-control" id="uname" placeholder="Username" name="uname" required>
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" required>
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
            </div>
        </form>
</div>

<div class="card-header p-2 font-weight-bolder">Test connection</div>

<div class="container p-3">
    <button type="submit" class="btn btn-success">Connect</button>
    <div class="alert alert-success mt-2">Connection sucessful!</div>

    <div class="alert alert-danger mt-2">Connection failed!</div>
</div>

<?= $this->endSection() ?>

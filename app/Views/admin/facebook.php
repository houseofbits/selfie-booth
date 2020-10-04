<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>

<div class="card-header p-2 font-weight-bolder">
    Share image to Facebook
    <button type="submit" class="btn btn-primary float-right">Save</button>
</div>
<div class="container p-3">
    <div class="form-group form-check mb-0">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">On/Off</label>
    </div>
</div>

<?= $this->endSection() ?>

<?= $this->extend('admin/layout') ?>
<?= $this->section('content') ?>
   
<div class="card-header p-2 font-weight-bolder">Activity log</div>
<div class="container p-3">
    <table class="table table-sm">
        <thead class="thead-light">
            <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Message</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><span class="badge badge-danger">CRITICAL</span></td>
                <td>2020-09-19 14:28:20</td>
                <td>Invalid file: layout.php</td>
            </tr>
            <tr>
                <td><span class="badge badge-warning">WARNING</span></td>
                <td>2020-09-19 14:28:20</td>
                <td>Invalid file: layout.php</td>
            </tr>
            <tr>
                <td><span class="badge badge-info">INFO</span></td>
                <td>2020-09-19 14:28:20</td>
                <td>Invalid file: layout.php</td>
            </tr>
        </tbody>
    </table>

    <ul class="pagination justify-content-center pagination-sm">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>

</div>

<?= $this->endSection() ?>
